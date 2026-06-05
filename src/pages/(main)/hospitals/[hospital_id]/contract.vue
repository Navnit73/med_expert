<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import {
  ArrowLeftIcon,
  ReportIcon,
  DownloadIcon,
  EyeIcon,
  CheckIcon,
  ClockIcon,
  AlertCircleIcon,
  FileTextIcon,
  SearchIcon,
  PlusIcon
} from "vue-tabler-icons";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { getHospitalById } from "@/utils/hospitalData";

const route = useRoute();
const hospitalId = computed(() => parseInt((route.params as any).hospital_id as string));
const hospital = computed(() => getHospitalById(hospitalId.value));

const page = ref({ title: "Hospital Contracts" });
const breadcrumbs = computed(() => [
  { title: "Hospital", disabled: false, href: "/hospitals/list" },
  { title: hospital.value?.name || "Modules", disabled: false, href: `/hospitals/${hospitalId.value}/menu` },
  { title: "Contract", disabled: true, href: "#" },
]);

const search = ref("");
const statusFilter = ref("All");

const contracts = ref([
  {
    id: "CON-2026-001",
    title: "Facility Operations & Maintenance Agreement",
    type: "Service Level Agreement (SLA)",
    value: "$120,000 / year",
    startDate: "2026-01-01",
    endDate: "2028-12-31",
    status: "Active",
    signatory: "Director of Operations"
  },
  {
    id: "CON-2026-008",
    title: "Medical Equipment Procurement Contract (MRI Scanner)",
    type: "Vendor Agreement",
    value: "$450,000 (One-time)",
    startDate: "2026-03-15",
    endDate: "2027-03-14",
    status: "Active",
    signatory: "Head of Radiology"
  },
  {
    id: "CON-2026-015",
    title: "Waste Management and Biohazard Disposal Service",
    type: "Service Contract",
    value: "$35,000 / year",
    startDate: "2025-06-01",
    endDate: "2026-05-31",
    status: "Pending Review",
    signatory: "Environmental Safety Officer"
  },
  {
    id: "CON-2025-094",
    title: "On-Call Emergency Staffing Partnership",
    type: "Staffing SLA",
    value: "$85,000 / year",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "Expired",
    signatory: "Chief Medical Officer"
  }
]);

const filteredContracts = computed(() => {
  return contracts.value.filter((c) => {
    const matchSearch =
      !search.value ||
      c.title.toLowerCase().includes(search.value.toLowerCase()) ||
      c.id.toLowerCase().includes(search.value.toLowerCase()) ||
      c.signatory.toLowerCase().includes(search.value.toLowerCase());
    const matchStatus =
      statusFilter.value === "All" || c.status === statusFilter.value;
    return matchSearch && matchStatus;
  });
});

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "success";
    case "Pending Review": return "warning";
    case "Expired": return "error";
    default: return "grey";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Active": return CheckIcon;
    case "Pending Review": return ClockIcon;
    case "Expired": return AlertCircleIcon;
    default: return FileTextIcon;
  }
};
</script>

<template>
  <div v-if="hospital">
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

 

   

    <!-- Filters + Actions -->
    <v-card  class="mb-6 pa-5">
      <v-row align="center">
        <!-- Search bar -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            label="Search contracts by ID, title, or signatory..."
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
            :items="['All', 'Active', 'Pending Review', 'Expired']"
            label="Contract Status"
            variant="outlined"
            density="compact"
            hide-details
          />
        </v-col>

        <!-- Register Contract Button -->
        <v-col cols="12" sm="6" md="3">
          <v-btn color="primary" elevation="0" block>
            <PlusIcon size="18" class="mr-1" />
            Register Contract
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Contracts list card -->
    <v-card >
      <v-card-title class="pa-4 bg-grey-lighten-4">
        <div class="d-flex justify-space-between align-center flex-wrap ga-3">
          <div class="font-weight-semibold text-subtitle-1">Hospital Agreements</div>
          <v-chip color="primary" size="small" variant="flat">
            Showing {{ filteredContracts.length }} of {{ contracts.length }} Agreements
          </v-chip>
        </div>
      </v-card-title>
      <v-divider />

      <v-table hover>
        <thead>
          <tr class="bg-grey-lighten-4">
            <th class="font-weight-bold text-left">Document ID</th>
            <th class="font-weight-bold text-left">Contract Description</th>
            <th class="font-weight-bold text-left">Type</th>
            <th class="font-weight-bold text-right">Value</th>
            <th class="font-weight-bold text-center">Duration</th>
            <th class="font-weight-bold text-center">Status</th>
            <th class="font-weight-bold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="con in filteredContracts" :key="con.id">
            <td class="text-caption text-primary font-weight-bold">{{ con.id }}</td>
            <td class="py-3" style="max-width: 320px;">
              <div class="font-weight-semibold text-body-2 text-truncate">{{ con.title }}</div>
              <div class="text-caption text-medium-emphasis">Signatory: {{ con.signatory }}</div>
            </td>
            <td>
              <v-chip size="x-small" variant="tonal" color="secondary">
                {{ con.type }}
              </v-chip>
            </td>
            <td class="text-right font-weight-semibold text-body-2">{{ con.value }}</td>
            <td class="text-center text-caption text-medium-emphasis">
              {{ con.startDate }} &bull; {{ con.endDate }}
            </td>
            <td class="text-center">
              <v-chip
                :color="getStatusColor(con.status)"
                size="small"
                variant="flat"
              >
                <component :is="getStatusIcon(con.status)" size="12" class="mr-1" />
                {{ con.status }}
              </v-chip>
            </td>
            <td class="text-center">
              <div class="d-flex justify-center ga-1">
                <v-btn icon size="x-small" variant="text" color="info">
                  <EyeIcon size="16" />
                </v-btn>
                <v-btn icon size="x-small" variant="text" color="primary">
                  <DownloadIcon size="16" />
                </v-btn>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="filteredContracts.length === 0">
            <td colspan="7" class="text-center py-8">
              <AlertCircleIcon size="48" class="text-medium-emphasis mb-2 d-block mx-auto" />
              <div class="text-body-1 text-medium-emphasis font-weight-semibold">No contracts found</div>
              <div class="text-caption text-disabled">Try adjusting your search or filters</div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>

  <div v-else class="text-center py-12">
    <AlertCircleIcon size="64" color="error" class="mb-4" />
    <h2 class="text-h5 font-weight-bold">Contract Module Not Found</h2>
    <v-btn color="primary" class="mt-4" to="/hospitals/list">Back to List</v-btn>
  </div>
</template>
