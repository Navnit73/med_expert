<script setup lang="ts">
import { ref, shallowRef, computed } from "vue";
import { useRouter } from "vue-router";
import {
  SearchIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  PhoneIcon,
  MailIcon,
  StethoscopeIcon,
  CalendarIcon,
  BuildingHospitalIcon,
  GenderMaleIcon,
  GenderFemaleIcon,
  AwardIcon,
  CircleOffIcon
} from "vue-tabler-icons";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";

const router = useRouter();
const page = ref({ title: "Doctor List" });
const breadcrumbs = shallowRef([
  { title: "Doctors", disabled: false, href: "#" },
  { title: "List", disabled: true, href: "#" },
]);

const hospitals = ref([
  { id: 1, name: "City General Hospital" },
  { id: 2, name: "St. Mary's Medical Center" },
  { id: 3, name: "Westside Clinic" },
  { id: 4, name: "Regional Medical Institute" },
  { id: 5, name: "Sunrise Hospital" },
  { id: 6, name: "Metro Eye & ENT Center" },
  { id: 7, name: "Green Valley Cancer Institute" },
]);

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
    avatar: null,
    languages: ["English", "Spanish"],
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
    qualifications: ["MD", "PhD", "FAAN"],
    gender: "Male",
    status: "Active",
    avatar: null,
    languages: ["English", "Mandarin"],
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
    qualifications: ["MD", "FAAP"],
    gender: "Female",
    status: "Active",
    avatar: null,
    languages: ["English"],
    bio: "Compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence."
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
    avatar: null,
    languages: ["English", "French"],
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
    qualifications: ["MD", "ABIM"],
    gender: "Female",
    status: "On Leave",
    avatar: null,
    languages: ["English", "German"],
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
    qualifications: ["MD", "FACS"],
    gender: "Male",
    status: "Active",
    avatar: null,
    languages: ["English", "Spanish"],
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
    qualifications: ["MD", "PhD", "FASCO"],
    gender: "Female",
    status: "Active",
    avatar: null,
    languages: ["English"],
    bio: "Dedicated oncologist committed to providing personalized cancer treatment and compassionate care."
  },
]);

const search = ref("");
const hospitalFilter = ref("");
const statusFilter = ref("");
const specializationFilter = ref("");
const deleteDialog = ref(false);
const selectedDoctor = ref<any>(null);

const specializations = ["All", "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "General Medicine", "Ophthalmology", "Oncology"];

const filteredDoctors = computed(() => {
  return doctors.value.filter((d) => {
    const matchSearch =
      !search.value ||
      `${d.firstName} ${d.lastName}`.toLowerCase().includes(search.value.toLowerCase()) ||
      d.email.toLowerCase().includes(search.value.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.value.toLowerCase());
    const matchHospital = !hospitalFilter.value || d.hospitalId === hospitalFilter.value;
    const matchStatus = !statusFilter.value || d.status === statusFilter.value;
    const matchSpec = !specializationFilter.value || specializationFilter.value === "All" || d.specialization === specializationFilter.value;
    return matchSearch && matchHospital && matchStatus && matchSpec;
  });
});

function getHospitalName(hospitalId: number) {
  const hospital = hospitals.value.find((h) => h.id === hospitalId);
  return hospital?.name || "Unknown";
}

function confirmDelete(doctor: any) {
  selectedDoctor.value = doctor;
  deleteDialog.value = true;
}

function deleteDoctor() {
  doctors.value = doctors.value.filter((d) => d.id !== selectedDoctor.value?.id);
  deleteDialog.value = false;
  selectedDoctor.value = null;
}

function viewProfile(id: number) {
  router.push(`/doctors/profile?id=${id}`);
}
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />
  <v-row>
    <v-col cols="12">
      <UiParentCard title="All Doctors">
        <!-- Filters -->
        <v-row class="mb-4" align="center">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="search"
              label="Search doctors..."
              variant="outlined"
              density="compact"
              hide-details
              clearable
            >
              <template #prepend-inner>
                <SearchIcon size="20" class="mr-2" />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-select
              v-model="specializationFilter"
              :items="specializations"
              label="Specialization"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-select
              v-model="hospitalFilter"
              :items="[{ id: '', name: 'All Hospitals' }, ...hospitals]"
              item-title="name"
              item-value="id"
              label="Hospital"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-select
              v-model="statusFilter"
              :items="['', 'Active', 'On Leave', 'Inactive']"
              label="Status"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-btn color="primary" to="/doctors/add" elevation="0" block>
              <template #prepend>
                <PlusIcon size="20" />
              </template>
              Add Doctor
            </v-btn>
          </v-col>
        </v-row>

        <!-- Doctor Cards Grid -->
        <v-row>
          <v-col
            v-for="doctor in filteredDoctors"
            :key="doctor.id"
            cols="12"
            md="6"
            lg="4"
          >
            <v-card variant="outlined" class="doctor-card">
              <v-card-text>
                <div class="d-flex align-start mb-4">
                  <v-avatar size="64" color="primary" rounded="lg">
                    <UserIcon size="32" color="white" />
                  </v-avatar>
                  <div class="ml-3 flex-grow-1">
                    <div class="d-flex align-center justify-space-between">
                      <h3 class="text-h6 font-weight-semibold">
                        Dr. {{ doctor.firstName }} {{ doctor.lastName }}
                      </h3>
                      <v-chip
                        :color="doctor.status === 'Active' ? 'success' : doctor.status === 'On Leave' ? 'warning' : 'error'"
                        size="x-small"
                        variant="flat"
                      >
                        {{ doctor.status }}
                      </v-chip>
                    </div>
                    <div class="text-body-2 text-medium-emphasis mt-1">
                      <StethoscopeIcon size="14" class="mr-1" />
                      {{ doctor.specialization }}
                    </div>
                  </div>
                </div>

                <v-divider class="my-3" />

                <div class="mb-3">
                  <div class="d-flex align-center mb-2">
                    <BuildingHospitalIcon size="16" class="mr-2 text-medium-emphasis" />
                    <span class="text-body-2">{{ getHospitalName(doctor.hospitalId) }}</span>
                  </div>
                  <div class="d-flex align-center mb-2">
                    <AwardIcon size="16" class="mr-2 text-medium-emphasis" />
                    <span class="text-body-2">{{ doctor.qualifications.join(", ") }}</span>
                  </div>
                  <div class="d-flex align-center mb-2">
                    <CalendarIcon size="16" class="mr-2 text-medium-emphasis" />
                    <span class="text-body-2">{{ doctor.experience }} years experience</span>
                  </div>
                </div>

                <v-divider class="my-3" />

                <div class="d-flex align-center mb-2">
                  <MailIcon size="16" class="mr-2 text-medium-emphasis" />
                  <span class="text-caption text-truncate">{{ doctor.email }}</span>
                </div>
                <div class="d-flex align-center">
                  <PhoneIcon size="16" class="mr-2 text-medium-emphasis" />
                  <span class="text-caption">{{ doctor.phone }}</span>
                </div>

                <v-divider class="my-3" />

                <div class="d-flex justify-center ga-2">
                  <v-btn variant="text" color="info" size="small" @click="viewProfile(doctor.id)">
                    <EyeIcon size="20" />
                  </v-btn>
                  <v-btn variant="text" color="primary" size="small" :to="`/doctors/edit?id=${doctor.id}`">
                    <PencilIcon size="20" />
                  </v-btn>
                  <v-btn variant="text" color="error" size="small" @click="confirmDelete(doctor)">
                    <TrashIcon size="20" />
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Empty State -->
          <v-col v-if="filteredDoctors.length === 0" cols="12">
            <div class="text-center py-12">
              <CircleOffIcon size="64" color="rgb(var(--v-theme-grey-lighten-2))" class="mb-4" />
              <h3 class="text-h6 mb-2">No doctors found</h3>
              <p class="text-body-2 text-medium-emphasis">Try adjusting your search or filters</p>
            </div>
          </v-col>
        </v-row>

        <div class="d-flex justify-space-between align-center mt-4">
          <span class="text-body-2 text-medium-emphasis">
            Showing {{ filteredDoctors.length }} of {{ doctors.length }} doctors
          </span>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>

  <!-- Delete Confirmation Dialog -->
  <v-dialog v-model="deleteDialog" max-width="420" persistent>
    <v-card rounded="lg">
      <v-card-title class="d-flex align-center pa-4">
        <TrashIcon color="rgb(var(--v-theme-error))" class="mr-2" />
        Confirm Delete
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-4">
        Are you sure you want to delete
        <strong>Dr. {{ selectedDoctor?.firstName }} {{ selectedDoctor?.lastName }}</strong>?
        This action cannot be undone.
      </v-card-text>
      <v-divider />
      <v-card-actions class="pa-3 justify-end">
        <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="error" variant="flat" @click="deleteDoctor">
          <TrashIcon size="18" class="mr-1" />
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.doctor-card {
  transition: all 0.2s ease;
}
.doctor-card:hover {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.1);
}
</style>