<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import {
  ArrowLeftIcon,
  UserIcon,
  SearchIcon,
  PlusIcon,
  EyeIcon,
  AlertCircleIcon,
  GenderMaleIcon,
  GenderFemaleIcon,
  CheckIcon,
  ClockIcon
} from "vue-tabler-icons";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { getHospitalById } from "@/utils/hospitalData";

const route = useRoute();
const hospitalId = computed(() => parseInt((route.params as any).hospital_id as string));
const hospital = computed(() => getHospitalById(hospitalId.value));

const page = ref({ title: "Patient Directory" });
const breadcrumbs = computed(() => [
  { title: "Hospital", disabled: false, href: "/hospitals/list" },
  { title: hospital.value?.name || "Modules", disabled: false, href: `/hospitals/${hospitalId.value}/menu` },
  { title: "Patient", disabled: true, href: "#" },
]);

const search = ref("");
const statusFilter = ref("All");

const patients = ref([
  {
    mrn: "MRN-98402",
    firstName: "Alice",
    lastName: "Williams",
    age: 34,
    gender: "Female",
    ward: "Room 304-B (ICU)",
    attendingDoctor: "Dr. Sarah Johnson",
    status: "Admitted",
    condition: "Post-op Recovery"
  },
  {
    mrn: "MRN-98409",
    firstName: "Benjamin",
    lastName: "Miller",
    age: 45,
    gender: "Male",
    ward: "Room 102-A",
    attendingDoctor: "Dr. Michael Chen",
    status: "Admitted",
    condition: "Stable"
  },
  {
    mrn: "MRN-98311",
    firstName: "Catherine",
    lastName: "Smith",
    age: 72,
    gender: "Female",
    ward: "Outpatient",
    attendingDoctor: "Dr. Lisa Anderson",
    status: "Outpatient",
    condition: "Routine Checkup"
  },
  {
    mrn: "MRN-98522",
    firstName: "Daniel",
    lastName: "Jones",
    age: 58,
    gender: "Male",
    ward: "Discharged",
    attendingDoctor: "Dr. James Williams",
    status: "Discharged",
    condition: "Recovered"
  },
  {
    mrn: "MRN-98610",
    firstName: "Evelyn",
    lastName: "Brown",
    age: 26,
    gender: "Female",
    ward: "Room 205-C (Maternity)",
    attendingDoctor: "Dr. Amanda Taylor",
    status: "Admitted",
    condition: "Observation"
  }
]);

// Summary stats computed from the patients array
const patientStats = computed(() => {
  const total = patients.value.length;
  const admitted = patients.value.filter((p) => p.status === "Admitted").length;
  const outpatient = patients.value.filter((p) => p.status === "Outpatient").length;
  const discharged = patients.value.filter((p) => p.status === "Discharged").length;
  return { total, admitted, outpatient, discharged };
});

const statusConfig: Record<string, { color: string; icon: any }> = {
  Admitted: { color: "error", icon: AlertCircleIcon },
  Outpatient: { color: "info", icon: UserIcon },
  Discharged: { color: "success", icon: CheckIcon }
};

const filteredPatients = computed(() => {
  return patients.value.filter((p) => {
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
    const matchSearch =
      !search.value ||
      fullName.includes(search.value.toLowerCase()) ||
      p.mrn.toLowerCase().includes(search.value.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.value.toLowerCase());
    const matchStatus =
      statusFilter.value === "All" || p.status === statusFilter.value;
    return matchSearch && matchStatus;
  });
});
</script>

<template>
  <div v-if="hospital">
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />


    <!-- Summary Stats Bar -->
    <v-row dense class="mb-3">
      <v-col cols="6" sm="3">
        <v-card  class="pa-4 bg-grey-lighten-4">
          <div class="text-caption text-medium-emphasis">Total Patients</div>
          <div class="text-h5 font-weight-bold text-primary">{{ patientStats.total }}</div>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card  class="pa-4 bg-red-lighten-5">
          <div class="text-caption text-red-darken-3">Admitted</div>
          <div class="text-h5 font-weight-bold text-error">{{ patientStats.admitted }}</div>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card  class="pa-4 bg-blue-lighten-5">
          <div class="text-caption text-blue-darken-3">Outpatients</div>
          <div class="text-h5 font-weight-bold text-info">{{ patientStats.outpatient }}</div>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card  class="pa-4 bg-green-lighten-5">
          <div class="text-caption text-green-darken-3">Discharged</div>
          <div class="text-h5 font-weight-bold text-success">{{ patientStats.discharged }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Filters + Actions -->
    <v-card  class="mb-6 pa-5">
      <v-row align="center">
        <!-- Search bar -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            label="Search patients by name, MRN, or condition..."
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
            :items="['All', 'Admitted', 'Outpatient', 'Discharged']"
            label="Admission Status"
            variant="outlined"
            density="compact"
            hide-details
          />
        </v-col>

        <!-- Add Patient Button -->
        <v-col cols="12" sm="6" md="3">
          <v-btn color="primary" elevation="0" block>
            <PlusIcon size="18" class="mr-1" />
            Register Patient
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Patients list card -->
    <v-card >
      <v-card-title class="pa-4 bg-grey-lighten-4">
        <div class="d-flex justify-space-between align-center">
          <div class="font-weight-semibold text-subtitle-1">Patient Logbook</div>
          <span class="text-caption text-medium-emphasis">
            Showing {{ filteredPatients.length }} of {{ patients.length }} registered patients
          </span>
        </div>
      </v-card-title>
      <v-divider />

      <v-table hover>
        <thead>
          <tr class="bg-grey-lighten-4">
            <th class="font-weight-bold text-left">MRN</th>
            <th class="font-weight-bold text-left">Patient Name</th>
            <th class="font-weight-bold text-center">Gender</th>
            <th class="font-weight-bold text-left">Ward Location</th>
            <th class="font-weight-bold text-left">Attending Doctor</th>
            <th class="font-weight-bold text-left">Condition</th>
            <th class="font-weight-bold text-center">Status</th>
            <th class="font-weight-bold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in filteredPatients" :key="patient.mrn">
            <td class="text-caption font-weight-bold text-primary">{{ patient.mrn }}</td>
            <td class="py-3">
              <div class="font-weight-semibold text-body-2">{{ patient.firstName }} {{ patient.lastName }}</div>
              <div class="text-caption text-medium-emphasis">Age: {{ patient.age }}</div>
            </td>
            <td class="text-center">
              <v-avatar size="24" :color="patient.gender === 'Male' ? 'blue-lighten-5' : 'pink-lighten-5'">
                <GenderMaleIcon v-if="patient.gender === 'Male'" size="14" color="blue" />
                <GenderFemaleIcon v-else size="14" color="pink" />
              </v-avatar>
            </td>
            <td>{{ patient.ward }}</td>
            <td>
              <div class="text-body-2 font-weight-medium">{{ patient.attendingDoctor }}</div>
            </td>
            <td>{{ patient.condition }}</td>
            <td class="text-center">
              <v-chip
                :color="statusConfig[patient.status]?.color ?? 'grey'"
                size="small"
                variant="flat"
              >
                <component :is="statusConfig[patient.status]?.icon ?? UserIcon" size="12" class="mr-1" />
                {{ patient.status }}
              </v-chip>
            </td>
            <td class="text-center">
              <v-btn icon size="x-small" variant="text" color="primary">
                <EyeIcon size="16" />
              </v-btn>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="filteredPatients.length === 0">
            <td colspan="8" class="text-center py-8">
              <AlertCircleIcon size="48" class="text-medium-emphasis mb-2 d-block mx-auto" />
              <div class="text-body-1 text-medium-emphasis font-weight-semibold">No patients found</div>
              <div class="text-caption text-disabled">Try adjusting your search or filters</div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>

  <div v-else class="text-center py-12">
    <AlertCircleIcon size="64" color="error" class="mb-4" />
    <h2 class="text-h5 font-weight-bold">Patient Module Not Found</h2>
    <v-btn color="primary" class="mt-4" to="/hospitals/list">Back to List</v-btn>
  </div>
</template>
