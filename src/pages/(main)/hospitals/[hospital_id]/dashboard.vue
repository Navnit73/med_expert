<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import {
  ArrowLeftIcon,
  BedIcon,
  UsersIcon,
  StethoscopeIcon,
  ActivityIcon,
  TrendingUpIcon,
  ClockIcon,
  AlertCircleIcon,
  CalendarIcon
} from "vue-tabler-icons";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { getHospitalById } from "@/utils/hospitalData";

const route = useRoute();
const hospitalId = computed(() => parseInt((route.params as any).hospital_id as string));
const hospital = computed(() => getHospitalById(hospitalId.value));

const page = ref({ title: "Hospital Dashboard" });
const breadcrumbs = computed(() => [
  { title: "Hospital", disabled: false, href: "/hospitals/list" },
  { title: hospital.value?.name || "Modules", disabled: false, href: `/hospitals/${hospitalId.value}/menu` },
  { title: "Dashboard", disabled: true, href: "#" },
]);

const timeRange = ref("Last 7 Days");
const timeRanges = ["Last 7 Days", "Last 30 Days", "This Year"];

const stats = computed(() => {
  if (!hospital.value) return null;
  const occupiedBeds = hospital.value.beds - hospital.value.availableBeds;
  const occupancyPercent = Math.round((occupiedBeds / hospital.value.beds) * 100);
  
  // Adjust figures based on time range selected (mock representation of filter changes)
  let multiplier = 1;
  if (timeRange.value === "Last 30 Days") multiplier = 4.2;
  else if (timeRange.value === "This Year") multiplier = 52.8;

  return {
    totalBeds: hospital.value.beds,
    availableBeds: hospital.value.availableBeds,
    occupiedBeds,
    occupancyPercent,
    doctors: hospital.value.doctors,
    departments: hospital.value.departments,
    admissionsToday: Math.round(hospital.value.doctors * 0.4 * multiplier),
    emergencies: Math.round(hospital.value.availableBeds * 0.15)
  };
});

// Chart Configuration
const chartSeries = ref([
  {
    name: 'Outpatients',
    data: [31, 40, 28, 51, 42, 109, 100]
  },
  {
    name: 'Inpatient Admissions',
    data: [11, 32, 45, 32, 34, 52, 41]
  }
]);

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 300,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#5e35b1', '#1e88e5'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      categories: timeRange.value === "This Year" 
        ? ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov', 'Dec']
        : timeRange.value === "Last 30 Days"
        ? ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5']
        : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    grid: {
      borderColor: '#e0e0e0',
      strokeDashArray: 3
    },
    tooltip: {
      theme: 'light'
    }
  };
});

// Watch time range to modify chart series (simulating dynamic filter changes)
watch(timeRange, (newVal) => {
  if (newVal === "Last 30 Days") {
    chartSeries.value = [
      { name: 'Outpatients', data: [150, 230, 180, 290, 210] },
      { name: 'Inpatient Admissions', data: [65, 88, 70, 95, 82] }
    ];
  } else if (newVal === "This Year") {
    chartSeries.value = [
      { name: 'Outpatients', data: [1200, 1500, 1400, 1800, 1600, 2100, 2300] },
      { name: 'Inpatient Admissions', data: [450, 520, 480, 600, 580, 710, 750] }
    ];
  } else {
    chartSeries.value = [
      { name: 'Outpatients', data: [31, 40, 28, 51, 42, 109, 100] },
      { name: 'Inpatient Admissions', data: [11, 32, 45, 32, 34, 52, 41] }
    ];
  }
});

const recentAdmissions = ref([
  { id: "PA-1042", name: "John Doe", age: 45, department: "Cardiology", status: "Admitted", time: "10 mins ago" },
  { id: "PA-1043", name: "Jane Smith", age: 29, department: "Pediatrics", status: "Observation", time: "30 mins ago" },
  { id: "PA-1044", name: "Robert Johnson", age: 62, department: "Neurology", status: "Discharged", time: "1 hour ago" },
  { id: "PA-1045", name: "Emily Davis", age: 37, department: "Orthopedics", status: "In Surgery", time: "2 hours ago" },
]);

const departmentOccupancy = computed(() => [
  { name: "Emergency Care", staff: 12, occupancy: 85, color: "error" },
  { name: "ICU", staff: 8, occupancy: 92, color: "error" },
  { name: "General Ward", staff: 25, occupancy: 68, color: "warning" },
  { name: "Maternity", staff: 15, occupancy: 45, color: "success" },
]);

const getStatusColor = (status: string) => {
  switch (status) {
    case "Admitted": return "primary";
    case "Observation": return "warning";
    case "Discharged": return "success";
    case "In Surgery": return "error";
    default: return "grey";
  }
};
</script>

<template>
  <div v-if="hospital && stats">
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

   

    <!-- Filters Bar -->
    <v-card  class="mb-3 pa-4 bg-grey-lighten-4">
      <v-row align="center" dense>
        <v-col cols="12" sm="6" md="4" class="d-flex align-center">
          <CalendarIcon size="20" class="mr-2 text-primary" />
          <v-select
            v-model="timeRange"
            :items="timeRanges"
            label="Dashboard Timeframe"
            variant="outlined"
            density="compact"
            hide-details
            class="bg-white"
          />
        </v-col>
        <v-col cols="12" sm="6" md="8" class="text-sm-right">
          <span class="text-caption text-medium-emphasis font-italic">
            Data auto-updates every 5 mins. Filters apply to metrics and admission charts.
          </span>
        </v-col>
      </v-row>
    </v-card>

    <!-- KPIs -->
    <v-row dense class="mb-6">
      <!-- Bed Occupancy -->
      <v-col cols="12" sm="6" lg="3">
        <v-card  class="bg-primary text-white pa-5">
          <div class="d-flex justify-space-between align-start">
            <div>
              <p class="text-caption text-white-darken-2 mb-1">Bed Occupancy</p>
              <h2 class="text-h4 font-weight-bold">{{ stats.occupancyPercent }}%</h2>
              <div class="text-caption text-white-darken-2 mt-2">
                {{ stats.occupiedBeds }} occupied / {{ stats.totalBeds }} total
              </div>
            </div>
            <v-avatar color="white" variant="tonal" size="48">
              <BedIcon size="24" />
            </v-avatar>
          </div>
          <v-progress-linear :model-value="stats.occupancyPercent" color="white" bg-color="rgba(255,255,255,0.2)" class="mt-4" rounded height="4" />
        </v-card>
      </v-col>

      <!-- Active Doctors -->
      <v-col cols="12" sm="6" lg="3">
        <v-card  class="bg-success text-white pa-5">
          <div class="d-flex justify-space-between align-start">
            <div>
              <p class="text-caption text-white-darken-2 mb-1">Active Doctors</p>
              <h2 class="text-h4 font-weight-bold">{{ stats.doctors }}</h2>
              <div class="text-caption text-white-darken-2 mt-2">
                Across {{ stats.departments }} medical departments
              </div>
            </div>
            <v-avatar color="white" variant="tonal" size="48">
              <StethoscopeIcon size="24" />
            </v-avatar>
          </div>
          <v-progress-linear :model-value="100" color="white" bg-color="rgba(255,255,255,0.2)" class="mt-4" rounded height="4" />
        </v-card>
      </v-col>

      <!-- Admissions Today -->
      <v-col cols="12" sm="6" lg="3">
        <v-card  class="bg-info text-white pa-5">
          <div class="d-flex justify-space-between align-start">
            <div>
              <p class="text-caption text-white-darken-2 mb-1">
                {{ timeRange === "Last 7 Days" ? "Admissions Today" : timeRange === "Last 30 Days" ? "Admissions (30d)" : "Admissions (YTD)" }}
              </p>
              <h2 class="text-h4 font-weight-bold">{{ stats.admissionsToday }}</h2>
              <div class="text-caption text-white-darken-2 mt-2">
                Scoped to {{ timeRange }}
              </div>
            </div>
            <v-avatar color="white" variant="tonal" size="48">
              <UsersIcon size="24" />
            </v-avatar>
          </div>
          <v-progress-linear :model-value="75" color="white" bg-color="rgba(255,255,255,0.2)" class="mt-4" rounded height="4" />
        </v-card>
      </v-col>

      <!-- Emergency Queue -->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="bg-secondary text-white pa-5">
          <div class="d-flex justify-space-between align-start">
            <div>
              <p class="text-caption text-white-darken-2 mb-1">Active ER Cases</p>
              <h2 class="text-h4 font-weight-bold">{{ stats.emergencies }}</h2>
              <div class="text-caption text-white-darken-2 mt-2">
                Avg wait time: 14 mins
              </div>
            </div>
            <v-avatar color="white" variant="tonal" size="48">
              <ActivityIcon size="24" />
            </v-avatar>
          </div>
          <v-progress-linear :model-value="50" color="white" bg-color="rgba(255,255,255,0.2)" class="mt-4" rounded height="4" />
        </v-card>
      </v-col>
    </v-row>

    <!-- Chart row -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card >
          <v-card-title class="d-flex align-center justify-space-between pa-4">
            <div class="d-flex align-center ga-2">
              <v-avatar color="primary" variant="tonal" size="36" rounded="lg">
                <TrendingUpIcon size="18" />
              </v-avatar>
              <div>
                <div class="text-subtitle-1 font-weight-semibold">Patient Admission Trends</div>
                <div class="text-caption text-medium-emphasis">Outpatient vs Inpatient capacity analysis</div>
              </div>
            </div>
          </v-card-title>
          <v-divider />
          <v-card-text class="pa-4">
            <apexchart type="area" height="300" :options="chartOptions" :series="chartSeries"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Recent Patients -->
      <v-col cols="12" lg="7">
        <v-card  class="h-100">
          <v-card-title class="d-flex align-center justify-space-between pa-4">
            <div class="d-flex align-center ga-2">
              <v-avatar color="primary" variant="tonal" size="36" rounded="lg">
                <UsersIcon size="18" />
              </v-avatar>
              <div>
                <div class="text-subtitle-1 font-weight-semibold">Recent Patient Admissions</div>
                <div class="text-caption text-medium-emphasis">Live feed of admissions</div>
              </div>
            </div>
          </v-card-title>
          <v-divider />
          <v-table hover>
            <thead>
              <tr class="bg-grey-lighten-4">
                <th class="text-left font-weight-bold">Patient ID</th>
                <th class="text-left font-weight-bold">Patient Name</th>
                <th class="text-left font-weight-bold">Specialty</th>
                <th class="text-center font-weight-bold">Status</th>
                <th class="text-right font-weight-bold">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in recentAdmissions" :key="patient.id">
                <td class="text-caption text-primary font-weight-bold">{{ patient.id }}</td>
                <td>
                  <div class="font-weight-medium">{{ patient.name }}</div>
                  <div class="text-caption text-medium-emphasis">{{ patient.age }} yrs</div>
                </td>
                <td>{{ patient.department }}</td>
                <td class="text-center">
                  <v-chip :color="getStatusColor(patient.status)" size="x-small" variant="flat">
                    {{ patient.status }}
                  </v-chip>
                </td>
                <td class="text-right text-caption text-medium-emphasis">{{ patient.time }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <!-- Department Distribution -->
      <v-col cols="12" lg="5">
        <v-card  class="h-100">
          <v-card-title class="d-flex align-center ga-2 pa-4">
            <v-avatar color="info" variant="tonal" size="36" rounded="lg">
              <TrendingUpIcon size="18" />
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-semibold">Critical Ward Loads</div>
              <div class="text-caption text-medium-emphasis">Live ward capacity monitoring</div>
            </div>
          </v-card-title>
          <v-divider />
          <v-card-text class="pa-4">
            <div class="d-flex flex-column ga-4">
              <div v-for="dept in departmentOccupancy" :key="dept.name">
                <div class="d-flex justify-space-between align-center mb-1">
                  <span class="font-weight-medium text-body-2">{{ dept.name }}</span>
                  <span :class="`text-${dept.color} font-weight-bold text-caption`">{{ dept.occupancy }}% Capacity</span>
                </div>
                <v-progress-linear :model-value="dept.occupancy" :color="dept.color" height="6" rounded />
                <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-1">
                  <span>{{ dept.staff }} staff on shift</span>
                  <span>Normal operating limits</span>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>

  <div v-else class="text-center py-12">
    <AlertCircleIcon size="64" color="error" class="mb-4" />
    <h2 class="text-h5 font-weight-bold">Hospital Dashboard Not Found</h2>
    <v-btn color="primary" class="mt-4" to="/hospitals/list">Back to List</v-btn>
  </div>
</template>
