<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  DashboardIcon,
  ReportIcon,
  UserIcon,
  BuildingHospitalIcon,
  StethoscopeIcon,
  PhoneIcon,
  MailIcon,
  BuildingIcon,
  StarIcon,
  ChevronRightIcon,
} from "vue-tabler-icons";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { getHospitalById } from "@/utils/hospitalData";

const route = useRoute();
const router = useRouter();

const hospitalId = computed(() => parseInt((route.params as any).hospital_id as string));
const hospital = computed(() => getHospitalById(hospitalId.value));

const page = ref({ title: "Hospital Modules" });
const breadcrumbs = computed(() => [
  { title: "Hospital", disabled: false, href: "/hospitals/list" },
  { title: hospital.value?.name || "Modules", disabled: true, href: "#" },
]);

const modules = computed(() => [
  {
    title: "Dashboard",
    description: "Real-time statistics, occupancy charts, and performance analytics",
    icon: DashboardIcon,
    color: "primary",
    to: `/hospitals/${hospitalId.value}/dashboard`,
  },
  {
    title: "Contract",
    description: "Review, manage, and download hospital legal contracts",
    icon: ReportIcon,
    color: "secondary",
    to: `/hospitals/${hospitalId.value}/contract`,
  },
  {
    title: "Patient",
    description: "Registered patients directory, admissions, and medical records",
    icon: UserIcon,
    color: "success",
    to: `/hospitals/${hospitalId.value}/patient`,
  },
  {
    title: "Department",
    description: "Configure medical departments, wards, and specialized units",
    icon: BuildingHospitalIcon,
    color: "warning",
    to: `/hospitals/${hospitalId.value}/department`,
  },
  {
    title: "Doctors",
    description: "View staff list, add physicians, and manage schedules",
    icon: StethoscopeIcon,
    color: "info",
    to: `/doctors/list?hospitalId=${hospitalId.value}`,
  },
]);

const statusColor = computed(() =>
  hospital.value?.status === "Active"
    ? "success"
    : hospital.value?.status === "Inactive"
    ? "error"
    : "warning"
);

function navigateToModule(path: string) {
  router.push(path);
}
</script>

<template>
  <div v-if="hospital">
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

    <!-- Hospital Hero Card -->
    <v-card class="mb-3" >
      <!-- Gradient Header using Vuetify bg color utility -->
      <v-sheet  rounded="t-lg" class="pa-4 pa-md-8">
        <v-row align="start" justify="space-between" no-gutters>
          <!-- Left -->
          <v-col cols="12" sm="auto">
         
            <p class="text-h1 font-weight-bold text-black mb-1">{{ hospital.name }}</p>
           
          </v-col>

          <!-- Right -->
          <v-col cols="12" sm="auto" class="d-flex flex-column align-sm-end ga-3 mt-4 mt-sm-0">
           
           
            <v-chip :color="statusColor" variant="flat" size="small" class="font-weight-semibold">
              {{ hospital.status }}
            </v-chip>
          </v-col>
        </v-row>
      </v-sheet>

      <v-divider />

      <!-- Contact Info Strip -->
      <v-card-text class="bg-surface py-3 px-6">
        <v-row dense>
          <v-col cols="12" sm="4">
            <div class="d-flex align-center ga-2">
              <v-avatar color="primary" variant="tonal" size="28" rounded="md">
                <PhoneIcon size="14" />
              </v-avatar>
              <span class="text-body-2 text-medium-emphasis">{{ hospital.phone }}</span>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="d-flex align-center ga-2">
              <v-avatar color="primary" variant="tonal" size="28" rounded="md">
                <MailIcon size="14" />
              </v-avatar>
              <span class="text-body-2 text-medium-emphasis">{{ hospital.email }}</span>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="d-flex align-center ga-2">
              <v-avatar color="primary" variant="tonal" size="28" rounded="md">
                <BuildingIcon size="14" />
              </v-avatar>
              <span class="text-body-2 text-medium-emphasis text-truncate">{{ hospital.address }}</span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Section Header -->
    <div class="d-flex align-center justify-space-between mb-5">
      <div>
        <p class="text-h5 font-weight-bold mb-0">Modules</p>
        <p class="text-body-2 text-medium-emphasis mb-0">Select a module to manage hospital operations</p>
      </div>
      <v-chip variant="tonal" color="primary" size="small">{{ modules.length }} available</v-chip>
    </div>

    <!-- Module Cards Grid -->
    <v-row dense>
      <v-col v-for="mod in modules" :key="mod.title" cols="12" sm="6" md="4" lg="3">
        <v-card
          class="h-100 cursor-pointer"
       
          :ripple="false"
          @click="navigateToModule(mod.to)"
        >
     

          <v-card-text class="pa-5 d-flex flex-column h-100">
            <!-- Icon + Arrow -->
            <div class="d-flex align-center justify-space-between mb-4">
              <v-avatar :color="mod.color" size="48" rounded="lg">
                <component :is="mod.icon" size="22" color="white" />
              </v-avatar>
              <v-btn
                :color="mod.color"
                icon
                variant="tonal"
                size="x-small"
                density="comfortable"
              >
                <ChevronRightIcon size="16" />
              </v-btn>
            </div>

            <!-- Title + Description -->
            <p class="text-h6 font-weight-bold mb-1">{{ mod.title }}</p>
            <p class="text-body-2 text-medium-emphasis mb-0 flex-grow-1">{{ mod.description }}</p>

            <v-divider class="mt-4 mb-3" />

            <div class="d-flex align-center justify-space-between">
              <span class="text-caption text-medium-emphasis">Open module</span>
              <v-icon size="14" color="medium-emphasis">mdi-arrow-top-right</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>

  <!-- Not Found State -->
  <div v-else class="d-flex flex-column align-center justify-center py-16 text-center">
    <v-avatar color="surface-variant" size="96" rounded="xl" class="mb-6">
      <BuildingHospitalIcon size="48" color="grey" />
    </v-avatar>
    <p class="text-h5 font-weight-bold mb-2">Hospital Not Found</p>
    <p class="text-body-1 text-medium-emphasis mb-6" style="max-width: 360px">
      The hospital you're looking for doesn't exist or may have been removed.
    </p>
    <v-btn color="primary" variant="flat" to="/hospitals/list" rounded="lg" prepend-icon="mdi-arrow-left">
      Back to List
    </v-btn>
  </div>
</template>