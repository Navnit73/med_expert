<script setup lang="ts">
import { ref, shallowRef, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  StethoscopeIcon,
  BuildingHospitalIcon,
  CalendarIcon,
  AwardIcon,
  LanguageIcon,
  ArrowLeftIcon,
  PencilIcon,
  GenderMaleIcon,
  GenderFemaleIcon,
  CheckIcon,
  ClockIcon
} from "vue-tabler-icons";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";

const route = useRoute();
const router = useRouter();
const page = ref({ title: "Doctor Profile" });
const breadcrumbs = shallowRef([
  { title: "Doctors", disabled: false, href: "/doctors/list" },
  { title: "Profile", disabled: true, href: "#" },
]);

const doctorId = ref(route.query.id as string || "1");

const doctors = ref([
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@citygeneral.com",
    phone: "+1 (555) 111-2233",
    specialization: "Cardiology",
    experience: 12,
    hospitalId: 1,
    qualifications: ["MD", "PhD", "FACC"],
    gender: "Female",
    status: "Active",
    languages: ["English", "Spanish"],
    bio: "Board-certified cardiologist with extensive experience in interventional cardiology and heart failure management. Dr. Johnson has performed over 500 cardiac procedures and is recognized for her patient-centered approach."
  },
  {
    id: 2,
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@stmarys.com",
    phone: "+1 (555) 222-3344",
    specialization: "Neurology",
    experience: 15,
    hospitalId: 2,
    qualifications: ["MD", "PhD", "FAAN"],
    gender: "Male",
    status: "Active",
    languages: ["English", "Mandarin"],
    bio: "Leading neurologist specializing in movement disorders and neurodegenerative diseases. Dr. Chen has published over 30 research papers and is a pioneer in Parkinson's disease treatment."
  },
  {
    id: 3,
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily.rodriguez@westside.com",
    phone: "+1 (555) 333-4455",
    specialization: "Pediatrics",
    experience: 8,
    hospitalId: 3,
    qualifications: ["MD", "FAAP"],
    gender: "Female",
    status: "Active",
    languages: ["English"],
    bio: "Compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence. Dr. Rodriguez believes in building long-term relationships with families."
  },
  {
    id: 4,
    firstName: "James",
    lastName: "Williams",
    email: "james.williams@regionalmedi.com",
    phone: "+1 (555) 444-5566",
    specialization: "Orthopedics",
    experience: 18,
    hospitalId: 4,
    qualifications: ["MD", "FAAOS"],
    gender: "Male",
    status: "Active",
    languages: ["English", "French"],
    bio: "Expert orthopedic surgeon specializing in sports medicine and joint replacement surgery. Dr. Williams has performed over 1000 joint replacement surgeries with excellent outcomes."
  },
  {
    id: 5,
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.anderson@sunrise.com",
    phone: "+1 (555) 555-6677",
    specialization: "General Medicine",
    experience: 10,
    hospitalId: 5,
    qualifications: ["MD", "ABIM"],
    gender: "Female",
    status: "On Leave",
    languages: ["English", "German"],
    bio: "Experienced general physician focusing on preventive medicine and chronic disease management. Dr. Anderson is known for her holistic approach to patient care."
  },
  {
    id: 6,
    firstName: "Robert",
    lastName: "Martinez",
    email: "robert.martinez@metro.com",
    phone: "+1 (555) 666-7788",
    specialization: "Ophthalmology",
    experience: 14,
    hospitalId: 6,
    qualifications: ["MD", "FACS"],
    gender: "Male",
    status: "Active",
    languages: ["English", "Spanish"],
    bio: "Skilled ophthalmologist with expertise in cataract surgery and retinal diseases. Dr. Martinez has restored vision to over 2000 patients through advanced surgical techniques."
  },
  {
    id: 7,
    firstName: "Amanda",
    lastName: "Taylor",
    email: "amanda.taylor@greenvalley.com",
    phone: "+1 (555) 777-8899",
    specialization: "Oncology",
    experience: 16,
    hospitalId: 7,
    qualifications: ["MD", "PhD", "FASCO"],
    gender: "Female",
    status: "Active",
    languages: ["English"],
    bio: "Dedicated oncologist committed to providing personalized cancer treatment and compassionate care. Dr. Taylor specializes in breast and lung cancer treatment with a success rate above industry standards."
  },
]);

const hospitals = ref([
  { id: 1, name: "City General Hospital" },
  { id: 2, name: "St. Mary's Medical Center" },
  { id: 3, name: "Westside Clinic" },
  { id: 4, name: "Regional Medical Institute" },
  { id: 5, name: "Sunrise Hospital" },
  { id: 6, name: "Metro Eye & ENT Center" },
  { id: 7, name: "Green Valley Cancer Institute" },
  { id: 8, name: "Harbour Women & Child Hospital" },
]);

const doctor = ref<any>(null);

onMounted(() => {
  doctor.value = doctors.value.find((d) => d.id === parseInt(doctorId.value));
});

function getHospitalName(hospitalId: number) {
  const hospital = hospitals.value.find((h) => h.id === hospitalId);
  return hospital?.name || "Unknown";
}

function editDoctor() {
  router.push(`/doctors/edit?id=${doctorId.value}`);
}
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <v-btn variant="text" class="mb-4" to="/doctors/list">
    <ArrowLeftIcon size="20" class="mr-2" />
    Back to Doctors List
  </v-btn>

  <v-card v-if="doctor" variant="flat">
    <v-row no-gutters>
      <!-- Left Side - Profile Card -->
      <v-col cols="12" md="4">
        <v-card variant="flat" class="h-100" color="primary">
          <v-card-text class="text-center pa-8">
            <v-avatar size="140" color="white" class="mb-4">
              <UserIcon size="70" color="rgb(var(--v-theme-primary))" />
            </v-avatar>

            <h2 class="text-h5 font-weight-bold text-white mb-1">
              Dr. {{ doctor.firstName }} {{ doctor.lastName }}
            </h2>

            <div class="text-subtitle-1 text-white-darken-1 mb-4">
              {{ doctor.specialization }}
            </div>

            <v-chip
              :color="doctor.status === 'Active' ? 'success' : doctor.status === 'On Leave' ? 'warning' : 'error'"
              variant="elevated"
              class="mb-4"
            >
              <component
                :is="doctor.status === 'Active' ? CheckIcon : ClockIcon"
                size="16"
                class="mr-1"
              />
              {{ doctor.status }}
            </v-chip>

            <v-divider class="border-opacity-20 my-4" />

            <div class="text-left">
              <div class="d-flex align-center mb-4">
                <BuildingHospitalIcon size="20" class="mr-3 text-white-darken-1" />
                <div>
                  <div class="text-caption text-white-darken-2">Hospital</div>
                  <div class="text-body-2 text-white">{{ getHospitalName(doctor.hospitalId) }}</div>
                </div>
              </div>

              <div class="d-flex align-center mb-4">
                <CalendarIcon size="20" class="mr-3 text-white-darken-1" />
                <div>
                  <div class="text-caption text-white-darken-2">Experience</div>
                  <div class="text-body-2 text-white">{{ doctor.experience }} Years</div>
                </div>
              </div>

              <div class="d-flex align-center">
                <GenderMaleIcon v-if="doctor.gender === 'Male'" size="20" class="mr-3 text-white-darken-1" />
                <GenderFemaleIcon v-else size="20" class="mr-3 text-white-darken-1" />
                <div>
                  <div class="text-caption text-white-darken-2">Gender</div>
                  <div class="text-body-2 text-white">{{ doctor.gender }}</div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Right Side - Details -->
      <v-col cols="12" md="8">
        <v-card-text class="pa-6">
          <!-- Actions -->
          <div class="d-flex justify-space-between align-center mb-6">
            <h3 class="text-h6 font-weight-semibold">Profile Details</h3>
            <v-btn color="primary" variant="tonal" @click="editDoctor">
              <PencilIcon size="20" class="mr-2" />
              Edit Profile
            </v-btn>
          </div>

          <!-- Contact Information -->
          <v-card variant="outlined" class="mb-4">
            <v-card-title class="d-flex align-center pa-4 bg-grey-lighten-4">
              <MailIcon size="20" class="mr-2" />
              Contact Information
            </v-card-title>
            <v-card-text class="pa-4">
              <v-row>
                <v-col cols="12" md="6">
                  <div class="text-caption text-medium-emphasis mb-1">Email Address</div>
                  <div class="d-flex align-center">
                    <MailIcon size="16" class="mr-2 text-primary" />
                    {{ doctor.email }}
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="text-caption text-medium-emphasis mb-1">Phone Number</div>
                  <div class="d-flex align-center">
                    <PhoneIcon size="16" class="mr-2 text-primary" />
                    {{ doctor.phone }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Professional Information -->
          <v-card variant="outlined" class="mb-4">
            <v-card-title class="d-flex align-center pa-4 bg-grey-lighten-4">
              <StethoscopeIcon size="20" class="mr-2" />
              Professional Information
            </v-card-title>
            <v-card-text class="pa-4">
              <v-row>
                <v-col cols="12" md="6">
                  <div class="text-caption text-medium-emphasis mb-1">Specialization</div>
                  <div class="d-flex align-center">
                    <StethoscopeIcon size="16" class="mr-2 text-primary" />
                    {{ doctor.specialization }}
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="text-caption text-medium-emphasis mb-1">Hospital</div>
                  <div class="d-flex align-center">
                    <BuildingHospitalIcon size="16" class="mr-2 text-primary" />
                    {{ getHospitalName(doctor.hospitalId) }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-caption text-medium-emphasis mb-1">Qualifications</div>
                  <div class="d-flex align-center flex-wrap ga-2">
                    <AwardIcon size="16" class="mr-2 text-primary" />
                    <v-chip
                      v-for="(qual, index) in doctor.qualifications"
                      :key="index"
                      size="small"
                      color="primary"
                      variant="tonal"
                    >
                      {{ qual }}
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Languages -->
          <v-card variant="outlined" class="mb-4">
            <v-card-title class="d-flex align-center pa-4 bg-grey-lighten-4">
              <LanguageIcon size="20" class="mr-2" />
              Languages Spoken
            </v-card-title>
            <v-card-text class="pa-4">
              <div class="d-flex flex-wrap ga-2">
                <v-chip
                  v-for="(lang, index) in doctor.languages"
                  :key="index"
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  {{ lang }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>

          <!-- Bio -->
          <v-card variant="outlined">
            <v-card-title class="d-flex align-center pa-4 bg-grey-lighten-4">
              <UserIcon size="20" class="mr-2" />
              About
            </v-card-title>
            <v-card-text class="pa-4">
              <p class="text-body-1">{{ doctor.bio }}</p>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>

  <!-- Not Found -->
  <v-card v-else variant="outlined" class="text-center pa-12">
    <UserIcon size="64" class="text-medium-emphasis mb-4" />
    <h3 class="text-h6 mb-2">Doctor Not Found</h3>
    <p class="text-body-2 text-medium-emphasis mb-4">
      The doctor profile you're looking for doesn't exist.
    </p>
    <v-btn color="primary" to="/doctors/list">
      <ArrowLeftIcon size="20" class="mr-2" />
      Back to List
    </v-btn>
  </v-card>
</template>