<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import {
  ArrowLeftIcon,
  BuildingHospitalIcon,
  UserIcon,
  CheckIcon,
  ToolIcon,
  AlertCircleIcon,
  PlusIcon,
  SearchIcon
} from "vue-tabler-icons";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { getHospitalById } from "@/utils/hospitalData";

const route = useRoute();
const hospitalId = computed(() => parseInt((route.params as any).hospital_id as string));
const hospital = computed(() => getHospitalById(hospitalId.value));

const page = ref({ title: "Departments Overview" });
const breadcrumbs = computed(() => [
  { title: "Hospital", disabled: false, href: "/hospitals/list" },
  { title: hospital.value?.name || "Modules", disabled: false, href: `/hospitals/${hospitalId.value}/menu` },
  { title: "Department", disabled: true, href: "#" },
]);

const search = ref("");
const statusFilter = ref("All");

const departments = ref([
  {
    name: "Cardiology",
    head: "Dr. Sarah Johnson",
    doctorsCount: 14,
    nursesCount: 22,
    totalBeds: 40,
    occupiedBeds: 32,
    status: "Operational"
  },
  {
    name: "Pediatrics",
    head: "Dr. Emily Rodriguez",
    doctorsCount: 10,
    nursesCount: 18,
    totalBeds: 30,
    occupiedBeds: 15,
    status: "Operational"
  },
  {
    name: "Neurology",
    head: "Dr. Michael Chen",
    doctorsCount: 8,
    nursesCount: 12,
    totalBeds: 25,
    occupiedBeds: 23,
    status: "Operational"
  },
  {
    name: "Orthopedics",
    head: "Dr. James Williams",
    doctorsCount: 12,
    nursesCount: 20,
    totalBeds: 35,
    occupiedBeds: 28,
    status: "Operational"
  },
  {
    name: "Emergency Medicine",
    head: "Dr. Lisa Anderson",
    doctorsCount: 18,
    nursesCount: 30,
    totalBeds: 20,
    occupiedBeds: 18,
    status: "Operational"
  },
  {
    name: "Oncology",
    head: "Dr. Amanda Taylor",
    doctorsCount: 9,
    nursesCount: 15,
    totalBeds: 30,
    occupiedBeds: 27,
    status: "Under Renovation"
  }
]);

const filteredDepartments = computed(() => {
  return departments.value.filter((d) => {
    const matchSearch =
      !search.value ||
      d.name.toLowerCase().includes(search.value.toLowerCase()) ||
      d.head.toLowerCase().includes(search.value.toLowerCase());
    const matchStatus =
      statusFilter.value === "All" || d.status === statusFilter.value;
    return matchSearch && matchStatus;
  });
});

const getStatusColor = (status: string) => {
  return status === "Operational" ? "success" : "warning";
};

const getStatusIcon = (status: string) => {
  return status === "Operational" ? CheckIcon : ToolIcon;
};

const getOccupancyPercent = (occupied: number, total: number) => {
  return Math.round((occupied / total) * 100);
};

const getOccupancyColor = (percent: number) => {
  if (percent >= 90) return "error";
  if (percent >= 75) return "warning";
  return "success";
};
</script>

<template>
  <div v-if="hospital">
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />



    <!-- Filters + Actions -->
    <v-card  class="mb-4 pa-5">
      <v-row align="center">
        <!-- Search bar -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            label="Search departments by name or HOD..."
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

        <!-- Status Filter -->
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="statusFilter"
            :items="['All', 'Operational', 'Under Renovation']"
            label="Department Status"
            variant="outlined"
            density="compact"
            hide-details
          />
        </v-col>

        <!-- Add Department Button -->
        <v-col cols="12" sm="6" md="3">
          <v-btn color="primary" elevation="0" block>
            <PlusIcon size="18" class="mr-1" />
            Add Department
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Departments Grid -->
    <v-row v-if="filteredDepartments.length > 0" dense>
      <v-col
        v-for="dept in filteredDepartments"
        :key="dept.name"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card  class="h-100 pa-5 d-flex flex-column justify-space-between">
          <div>
            <div class="d-flex align-start justify-space-between mb-4">
              <v-avatar color="primary" variant="tonal" size="44" rounded="lg">
                <BuildingHospitalIcon size="22" />
              </v-avatar>
              
              <v-chip
                :color="getStatusColor(dept.status)"
                size="small"
                variant="flat"
                class="font-weight-semibold"
              >
                <component :is="getStatusIcon(dept.status)" size="12" class="mr-1" />
                {{ dept.status }}
              </v-chip>
            </div>

            <h3 class="text-h6 font-weight-bold mb-1">{{ dept.name }}</h3>
            
            <div class="d-flex align-center text-body-2 text-medium-emphasis mb-4">
              <UserIcon size="14" class="mr-1 text-primary" />
              <span>Head: {{ dept.head }}</span>
            </div>

            <v-divider class="mb-4" />

            <!-- Staff Counts -->
            <v-row dense class="mb-4">
              <v-col cols="6">
                <div class="text-caption text-medium-emphasis">Attending Doctors</div>
                <div class="font-weight-bold text-body-1">{{ dept.doctorsCount }} Docs</div>
              </v-col>
              <v-col cols="6">
                <div class="text-caption text-medium-emphasis">Nursing Staff</div>
                <div class="font-weight-bold text-body-1">{{ dept.nursesCount }} Nurses</div>
              </v-col>
            </v-row>

          
          </div>

        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <AlertCircleIcon size="64" class="text-medium-emphasis mb-4 d-block mx-auto" />
      <h3 class="text-h5 font-weight-bold mb-2">No departments found</h3>
      <p class="text-body-2 text-medium-emphasis mb-0">Try adjusting your search query or filters</p>
    </div>
  </div>

  <div v-else class="text-center py-12">
    <AlertCircleIcon size="64" color="error" class="mb-4" />
    <h2 class="text-h5 font-weight-bold">Department Module Not Found</h2>
    <v-btn color="primary" class="mt-4" to="/hospitals/list">Back to List</v-btn>
  </div>
</template>
