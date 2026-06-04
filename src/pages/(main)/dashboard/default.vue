<script setup lang="ts">
import { ref } from "vue";
import {
  BuildingHospitalIcon,
  StethoscopeIcon,
  UsersIcon,
  BedIcon,
  CalendarIcon,
  CheckIcon,
  UserIcon,
  PlusIcon,
  ArrowUpRightIcon,
  ActivityIcon,
  ReportIcon,
  TrendingUpIcon,
  ClockIcon,
  AlertCircleIcon,
} from "vue-tabler-icons";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";

const page = ref({ title: "Dashboard" });
const breadcrumbs = [{ title: "Dashboard", disabled: false, href: "#" }];

const stats = ref({
  totalHospitals: 8,
  totalDoctors: 156,
  totalDepartments: 45,
  totalBeds: 1850,
  activeDoctors: 142,
  onLeaveDoctors: 8,
  totalPatients: 2450,
  appointmentsToday: 87,
});

const recentHospitals = ref([
  { id: 1, name: "City General Hospital", specialization: "Multi-specialty", doctors: 85, beds: 200, status: "Active", occupancy: 74 },
  { id: 2, name: "St. Mary's Medical Center", specialization: "Cardiology", doctors: 142, beds: 350, status: "Active", occupancy: 88 },
  { id: 3, name: "Green Valley Cancer Institute", specialization: "Oncology", doctors: 98, beds: 220, status: "Active", occupancy: 61 },
  { id: 4, name: "Harbour Women & Child Hospital", specialization: "Gynecology", doctors: 52, beds: 130, status: "Maintenance", occupancy: 45 },
]);

const recentDoctors = ref([
  { id: 1, name: "Dr. Sarah Johnson", specialization: "Cardiology", hospital: "City General Hospital", status: "Active", avatar: "SJ" },
  { id: 2, name: "Dr. Michael Chen", specialization: "Neurology", hospital: "St. Mary's Medical Center", status: "Active", avatar: "MC" },
  { id: 3, name: "Dr. Amanda Taylor", specialization: "Oncology", hospital: "Green Valley Cancer Institute", status: "Active", avatar: "AT" },
  { id: 4, name: "Dr. James Williams", specialization: "Orthopedics", hospital: "Regional Medical Institute", status: "On Leave", avatar: "JW" },
]);

const departmentStats = ref([
  { name: "Cardiology", doctors: 28, patients: 345, occupancy: 78 },
  { name: "Neurology", doctors: 22, patients: 280, occupancy: 82 },
  { name: "Pediatrics", doctors: 35, patients: 420, occupancy: 65 },
  { name: "Orthopedics", doctors: 18, patients: 198, occupancy: 71 },
  { name: "Oncology", doctors: 25, patients: 310, occupancy: 88 },
  { name: "General Medicine", doctors: 45, patients: 520, occupancy: 55 },
]);

const avatarColors = ["primary", "info", "success", "warning", "error", "secondary"];
const getAvatarColor = (index: number) => avatarColors[index % avatarColors.length];

const occupancyColor = (val: number) => val > 80 ? "error" : val > 65 ? "warning" : "success";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long", year: "numeric", month: "long", day: "numeric",
});
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <!-- Page Header -->
  <div class="d-flex align-center justify-space-between flex-wrap gap-3 mb-6">
    <div>
      <h1 class="text-h4 font-weight-bold">Hospital Management</h1>
      <p class="text-body-2 text-medium-emphasis mt-1">
        <ClockIcon size="14" class="mr-1" style="vertical-align: middle" />
        {{ today }}
      </p>
    </div>
    <div class="d-flex gap-2">
      <v-btn variant="outlined" color="primary" size="small">
        Export
      </v-btn>
      <v-btn color="primary" size="small">
        Quick Add
      </v-btn>
    </div>
  </div>

  <!-- KPI Cards -->
  <v-row dense class="mb-4">
    <v-col cols="12" sm="6" lg="3">
      <v-card rounded="lg" elevation="0" class="bg-primary text-white pa-5">
        <div class="d-flex justify-space-between align-start">
          <div>
            <p class="text-caption text-white-darken-2 mb-1">Total Hospitals</p>
            <h2 class="text-h4 font-weight-bold">{{ stats.totalHospitals }}</h2>
            <div class="d-flex align-center mt-2 text-caption text-white-darken-2">
              <ArrowUpRightIcon size="14" class="mr-1" />
              +2 this month
            </div>
          </div>
          <v-avatar color="white" variant="tonal" size="48">
            <BuildingHospitalIcon size="24" />
          </v-avatar>
        </div>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" lg="3">
      <v-card rounded="lg" elevation="0" class="bg-success text-white pa-5">
        <div class="d-flex justify-space-between align-start">
          <div>
            <p class="text-caption text-white-darken-2 mb-1">Total Doctors</p>
            <h2 class="text-h4 font-weight-bold">{{ stats.totalDoctors }}</h2>
            <div class="d-flex align-center gap-3 mt-2 text-caption text-white-darken-2">
              <span>{{ stats.activeDoctors }} active</span>
              <span>{{ stats.onLeaveDoctors }} on leave</span>
            </div>
          </div>
          <v-avatar color="white" variant="tonal" size="48">
            <StethoscopeIcon size="24" />
          </v-avatar>
        </div>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" lg="3">
      <v-card rounded="lg" elevation="0" class="bg-info text-white pa-5">
        <div class="d-flex justify-space-between align-start">
          <div>
            <p class="text-caption text-white-darken-2 mb-1">Total Patients</p>
            <h2 class="text-h4 font-weight-bold">{{ stats.totalPatients.toLocaleString() }}</h2>
            <div class="d-flex align-center mt-2 text-caption text-white-darken-2">
              <ArrowUpRightIcon size="14" class="mr-1" />
              +124 this week
            </div>
          </div>
          <v-avatar color="white" variant="tonal" size="48">
            <UserIcon size="24" />
          </v-avatar>
        </div>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" lg="3">
      <v-card rounded="lg" elevation="0" class="bg-secondary text-white pa-5">
        <div class="d-flex justify-space-between align-start">
          <div>
            <p class="text-caption text-white-darken-2 mb-1">Total Beds</p>
            <h2 class="text-h4 font-weight-bold">{{ stats.totalBeds.toLocaleString() }}</h2>
            <v-progress-linear model-value="72" color="white" bg-color="rgba(255,255,255,0.25)" height="4" rounded class="mt-3" />
            <span class="text-caption text-white-darken-2 mt-1 d-block">72% occupied</span>
          </div>
          <v-avatar color="white" variant="tonal" size="48">
            <BedIcon size="24" />
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </v-row>

  <!-- Secondary Metrics -->
  <v-row dense class="mb-6">
    <v-col cols="6" sm="3">
      <v-card rounded="lg" variant="outlined">
        <v-card-text class="pa-4 d-flex align-center gap-3">
          <v-avatar color="success" variant="tonal" size="40" rounded="lg">
            <CheckIcon size="20" />
          </v-avatar>
          <div>
            <div class="text-h5 font-weight-bold text-success">{{ stats.activeDoctors }}</div>
            <div class="text-caption text-medium-emphasis">Active Doctors</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6" sm="3">
      <v-card rounded="lg" variant="outlined">
        <v-card-text class="pa-4 d-flex align-center gap-3">
          <v-avatar color="warning" variant="tonal" size="40" rounded="lg">
            <CalendarIcon size="20" />
          </v-avatar>
          <div>
            <div class="text-h5 font-weight-bold text-warning">{{ stats.onLeaveDoctors }}</div>
            <div class="text-caption text-medium-emphasis">On Leave</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6" sm="3">
      <v-card rounded="lg" variant="outlined">
        <v-card-text class="pa-4 d-flex align-center gap-3">
          <v-avatar color="primary" variant="tonal" size="40" rounded="lg">
            <UsersIcon size="20" />
          </v-avatar>
          <div>
            <div class="text-h5 font-weight-bold">{{ stats.totalDepartments }}</div>
            <div class="text-caption text-medium-emphasis">Departments</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6" sm="3">
      <v-card rounded="lg" variant="outlined">
        <v-card-text class="pa-4 d-flex align-center gap-3">
          <v-avatar color="info" variant="tonal" size="40" rounded="lg">
            <ActivityIcon size="20" />
          </v-avatar>
          <div>
            <div class="text-h5 font-weight-bold text-info">{{ stats.appointmentsToday }}</div>
            <div class="text-caption text-medium-emphasis">Today's Appointments</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Main Tables Row -->
  <v-row class="mb-6">
    <!-- Hospitals Table -->
    <v-col cols="12" lg="7">
      <v-card rounded="lg" variant="outlined">
        <v-card-title class="d-flex align-center justify-space-between pa-4">
          <div class="d-flex align-center gap-2">
            <v-avatar color="primary" variant="tonal" size="36" rounded="lg">
              <BuildingHospitalIcon size="18" />
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-semibold">Recent Hospitals</div>
              <div class="text-caption text-medium-emphasis">{{ recentHospitals.length }} facilities</div>
            </div>
          </div>
          <v-btn variant="text" color="primary" size="small" to="/hospitals/list">
            View All
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-table hover>
          <thead>
            <tr>
              <th class="text-left">Hospital</th>
              <th class="text-center">Doctors</th>
              <th class="text-center">Beds</th>
              <th class="text-center">Occupancy</th>
              <th class="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(hospital, i) in recentHospitals" :key="hospital.id">
              <td>
                <div class="d-flex align-center gap-3">
                  <v-avatar :color="getAvatarColor(i)" variant="tonal" size="38" rounded="lg">
                    <BuildingHospitalIcon size="18" />
                  </v-avatar>
                  <div>
                    <div class="text-body-2 font-weight-medium">{{ hospital.name }}</div>
                    <div class="text-caption text-medium-emphasis">{{ hospital.specialization }}</div>
                  </div>
                </div>
              </td>
              <td class="text-center">{{ hospital.doctors }}</td>
              <td class="text-center">{{ hospital.beds }}</td>
              <td class="text-center">
                <div class="d-flex align-center gap-2 justify-center">
                  <v-progress-linear :model-value="hospital.occupancy" :color="occupancyColor(hospital.occupancy)" height="6" rounded style="max-width: 60px" />
                  <span class="text-caption">{{ hospital.occupancy }}%</span>
                </div>
              </td>
              <td class="text-center">
                <v-chip :color="hospital.status === 'Active' ? 'success' : 'warning'" size="small" rounded="lg">
                  {{ hospital.status }}
                </v-chip>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>

    <!-- Doctors Table -->
    <v-col cols="12" lg="5">
      <v-card rounded="lg" variant="outlined">
        <v-card-title class="d-flex align-center justify-space-between pa-4">
          <div class="d-flex align-center gap-2">
            <v-avatar color="info" variant="tonal" size="36" rounded="lg">
              <StethoscopeIcon size="18" />
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-semibold">Recent Doctors</div>
              <div class="text-caption text-medium-emphasis">{{ recentDoctors.length }} doctors</div>
            </div>
          </div>
          <v-btn variant="text" color="primary" size="small" to="/doctors/list">
            View All
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-list lines="two">
          <v-list-item v-for="(doctor, i) in recentDoctors" :key="doctor.id">
            <template #prepend>
              <v-avatar :color="getAvatarColor(i)" variant="tonal" size="44" rounded="lg" class="mr-3">
                <span class="text-caption font-weight-bold">{{ doctor.avatar }}</span>
              </v-avatar>
            </template>
            <v-list-item-title class="font-weight-medium">{{ doctor.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ doctor.hospital }}</v-list-item-subtitle>
            <template #append>
              <v-chip size="small" variant="tonal" color="primary" rounded="lg" class="mr-1">
                {{ doctor.specialization }}
              </v-chip>
              <v-chip :color="doctor.status === 'Active' ? 'success' : 'warning'" size="small" rounded="lg">
                {{ doctor.status }}
              </v-chip>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>

  <!-- Department Overview -->
  <v-row class="mb-6">
    <v-col cols="12">
      <v-card rounded="lg" variant="outlined">
        <v-card-title class="d-flex align-center gap-2 pa-4">
          <v-avatar color="warning" variant="tonal" size="36" rounded="lg">
            <TrendingUpIcon size="18" />
          </v-avatar>
          <div>
            <div class="text-subtitle-1 font-weight-semibold">Department Overview</div>
            <div class="text-caption text-medium-emphasis">Bed occupancy & staffing</div>
          </div>
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-row>
            <v-col v-for="dept in departmentStats" :key="dept.name" cols="12" sm="6" md="4">
              <v-card variant="outlined" rounded="lg" class="pa-4">
                <div class="d-flex justify-space-between align-center mb-2">
                  <span class="text-body-2 font-weight-semibold">{{ dept.name }}</span>
                  <v-chip size="small" variant="tonal" color="primary" rounded="lg">
                    {{ dept.doctors }} docs
                  </v-chip>
                </div>
                <div class="d-flex justify-space-between mb-2 text-caption text-medium-emphasis">
                  <span>{{ dept.patients }} patients</span>
                  <span :class="`text-${occupancyColor(dept.occupancy)}`">{{ dept.occupancy }}%</span>
                </div>
                <v-progress-linear :model-value="dept.occupancy" :color="occupancyColor(dept.occupancy)" height="8" rounded />
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Quick Actions -->
  <v-row>
    <v-col cols="12" md="4">
      <v-card rounded="lg" variant="outlined" to="/hospitals/add" class="cursor-pointer">
        <v-card-text class="pa-4 d-flex align-center gap-4">
          <v-avatar color="primary" variant="tonal" size="48" rounded="lg">
            <PlusIcon size="24" />
          </v-avatar>
          <div>
            <h3 class="text-body-1 font-weight-semibold">Add Hospital</h3>
            <p class="text-caption text-medium-emphasis mb-0">Register a new facility</p>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card rounded="lg" variant="outlined" to="/doctors/add" class="cursor-pointer">
        <v-card-text class="pa-4 d-flex align-center gap-4">
          <v-avatar color="info" variant="tonal" size="48" rounded="lg">
            <StethoscopeIcon size="24" />
          </v-avatar>
          <div>
            <h3 class="text-body-1 font-weight-semibold">Add Doctor</h3>
            <p class="text-caption text-medium-emphasis mb-0">Onboard a new physician</p>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card rounded="lg" variant="outlined">
        <v-card-text class="pa-4 d-flex align-center gap-4">
          <v-avatar color="warning" variant="tonal" size="48" rounded="lg">
            <ReportIcon size="24" />
          </v-avatar>
          <div>
            <h3 class="text-body-1 font-weight-semibold">View Reports</h3>
            <p class="text-caption text-medium-emphasis mb-0">Generate analytics</p>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>