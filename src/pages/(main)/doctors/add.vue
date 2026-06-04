<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
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

const router = useRouter();
const page = ref({ title: "Add Doctor" });
const breadcrumbs = shallowRef([
  { title: "Doctors", disabled: false, href: "/doctors/list" },
  { title: "Add Doctor", disabled: true, href: "#" },
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
  languages: "",
  bio: ""
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
      <UiParentCard title="Add New Doctor">
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
              >
                <template #prepend-inner>
                  <GenderMaleIcon size="20" class="mr-2 text-medium-emphasis" />
                </template>
              </v-select>
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
              >
                <template #prepend-inner>
                  <CalendarIcon size="20" class="mr-2 text-medium-emphasis" />
                </template>
              </v-text-field>
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
              >
                <template #prepend-inner>
                  <StethoscopeIcon size="20" class="mr-2 text-medium-emphasis" />
                </template>
              </v-select>
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
              >
                <template #prepend-inner>
                  <BuildingHospitalIcon size="20" class="mr-2 text-medium-emphasis" />
                </template>
              </v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Qualifications *</v-label>
              <v-text-field
                v-model="form.qualifications"
                placeholder="e.g., MD, PhD, FACP (comma separated)"
                variant="outlined"
                density="comfortable"
                hide-details
              >
                <template #prepend-inner>
                  <AwardIcon size="20" class="mr-2 text-medium-emphasis" />
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Languages</v-label>
              <v-text-field
                v-model="form.languages"
                placeholder="e.g., English, Spanish (comma separated)"
                variant="outlined"
                density="comfortable"
                hide-details
              >
                <template #prepend-inner>
                  <LanguageIcon size="20" class="mr-2 text-medium-emphasis" />
                </template>
              </v-text-field>
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
                  Save Doctor
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