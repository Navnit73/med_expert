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
  DeviceFloppyIcon,
  GenderMaleIcon,
  GenderFemaleIcon
} from "vue-tabler-icons";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";

const route = useRoute();
const router = useRouter();
const page = ref({ title: "Edit Doctor" });
const breadcrumbs = shallowRef([
  { title: "Doctors", disabled: false, href: "/doctors/list" },
  { title: "Edit Doctor", disabled: true, href: "#" },
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
    qualifications: "MD, PhD, FACC",
    gender: "Female",
    status: "Active",
    languages: "English, Spanish",
    bio: "Board-certified cardiologist with extensive experience in interventional cardiology and heart failure management."
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
    qualifications: "MD, PhD, FAAN",
    gender: "Male",
    status: "Active",
    languages: "English, Mandarin",
    bio: "Leading neurologist specializing in movement disorders and neurodegenerative diseases."
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
    qualifications: "MD, FAAP",
    gender: "Female",
    status: "Active",
    languages: "English",
    bio: "Compassionate pediatrician dedicated to providing comprehensive care for children."
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
    qualifications: "MD, FAAOS",
    gender: "Male",
    status: "Active",
    languages: "English, French",
    bio: "Expert orthopedic surgeon specializing in sports medicine and joint replacement surgery."
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
    qualifications: "MD, ABIM",
    gender: "Female",
    status: "On Leave",
    languages: "English, German",
    bio: "Experienced general physician focusing on preventive medicine and chronic disease management."
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
    qualifications: "MD, FACS",
    gender: "Male",
    status: "Active",
    languages: "English, Spanish",
    bio: "Skilled ophthalmologist with expertise in cataract surgery and retinal diseases."
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
    qualifications: "MD, PhD, FASCO",
    gender: "Female",
    status: "Active",
    languages: "English",
    bio: "Dedicated oncologist committed to providing personalized cancer treatment and compassionate care."
  },
]);

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  specialization: "",
  hospitalId: null as number | null,
  qualifications: "",
  experience: null as number | null,
  gender: "",
  status: "",
  languages: "",
  bio: ""
});

onMounted(() => {
  const doctor = doctors.value.find((d) => d.id === parseInt(doctorId.value));
  if (doctor) {
    form.value = { ...doctor };
  }
});

const specializations = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Ophthalmology",
  "Oncology",
  "General Medicine",
  "Dermatology",
  "Psychiatry",
  "Gynecology",
  "General Surgery"
];

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

const loading = ref(false);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />
  <v-row>
    <v-col cols="12">
      <UiParentCard >
       

        <v-form>
          <v-row>
            <!-- Personal Information -->
            <v-col cols="12">
              <h4 class="text-subtitle-1 font-weight-bold mb-4 text-primary">
                <UserIcon size="20" class="mr-2" />
                Personal Information
              </h4>
            </v-col>

            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">First Name *</v-label>
              <v-text-field
                v-model="form.firstName"
                placeholder="Enter first name"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Last Name *</v-label>
              <v-text-field
                v-model="form.lastName"
                placeholder="Enter last name"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Email Address *</v-label>
              <v-text-field
                v-model="form.email"
                placeholder="doctor@example.com"
                type="email"
                variant="outlined"
                density="comfortable"
                hide-details
              >
                <template #prepend-inner>
                  <MailIcon size="20" class="mr-2 text-medium-emphasis" />
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Phone Number *</v-label>
              <v-text-field
                v-model="form.phone"
                placeholder="+1 (555) 000-0000"
                variant="outlined"
                density="comfortable"
                hide-details
              >
                <template #prepend-inner>
                  <PhoneIcon size="20" class="mr-2 text-medium-emphasis" />
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Gender *</v-label>
              <v-select
                v-model="form.gender"
                :items="['Male', 'Female', 'Other']"
                placeholder="Select gender"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Status *</v-label>
              <v-select
                v-model="form.status"
                :items="['Active', 'On Leave', 'Inactive']"
                placeholder="Select status"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Years of Experience *</v-label>
              <v-text-field
                v-model="form.experience"
                placeholder="e.g., 5"
                type="number"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </v-col>

            <v-col cols="12">
              <v-label class="text-body-2 font-weight-medium mb-2">Bio / About</v-label>
              <v-textarea
                v-model="form.bio"
                placeholder="Brief description about the doctor..."
                variant="outlined"
                density="comfortable"
                rows="3"
                hide-details
              />
            </v-col>

            <v-col cols="12" class="mt-4">
              <h4 class="text-subtitle-1 font-weight-bold mb-4 text-primary">
                <StethoscopeIcon size="20" class="mr-2" />
                Professional Information
              </h4>
            </v-col>

            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Specialization *</v-label>
              <v-select
                v-model="form.specialization"
                :items="specializations"
                placeholder="Select specialization"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Hospital *</v-label>
              <v-select
                v-model="form.hospitalId"
                :items="hospitals"
                item-title="name"
                item-value="id"
                placeholder="Select hospital"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Qualifications *</v-label>
              <v-text-field
                v-model="form.qualifications"
                placeholder="e.g., MD, PhD, FACP (comma separated)"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Languages</v-label>
              <v-text-field
                v-model="form.languages"
                placeholder="e.g., English, Spanish (comma separated)"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </v-col>

            <v-col cols="12" class="mt-6">
              <v-divider class="mb-4" />
              <div class="d-flex gap-2">
                <v-btn
                  color="primary"
                  :loading="loading"
                  size="large"
                >
                  <DeviceFloppyIcon size="20" class="mr-2" />
                  Update Doctor
                </v-btn>
                <v-btn
                  variant="outlined"
                  size="large"
                  to="/doctors/list"
                >
                  <ArrowLeftIcon size="20" class="mr-2" />
                  Back to List
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>