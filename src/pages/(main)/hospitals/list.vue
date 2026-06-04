<script setup lang="ts">
import { ref, shallowRef, computed } from "vue";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  SearchIcon,
  PlusIcon,
  BuildingHospitalIcon,
  UserIcon,
  ClipboardListIcon,
  PhoneIcon,
  MailIcon,
  CircleIcon,
  CheckIcon,
  XIcon,
  ToolIcon,
  AlertCircleIcon,
  CircleOffIcon
} from "vue-tabler-icons";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";

const page = ref({ title: "Hospital List" });
const breadcrumbs = shallowRef([
  { title: "Hospital", disabled: false, href: "#" },
  { title: "List", disabled: true, href: "#" },
]);

const hospitals = ref([
  {
    id: 1,
    name: "City General Hospital",
    address: "123 Medical Avenue, Downtown",
    phone: "+1 (555) 123-4567",
    email: "contact@citygeneral.com",
    specialization: "General",
    beds: 200,
    availableBeds: 45,
    doctors: 85,
    departments: 12,
    establishedYear: "1995",
    rating: 4.5,
    type: "Government",
    status: "Active",
  },
  {
    id: 2,
    name: "St. Mary's Medical Center",
    address: "456 Health Street, Uptown",
    phone: "+1 (555) 234-5678",
    email: "info@stmarys.com",
    specialization: "Cardiology",
    beds: 350,
    availableBeds: 120,
    doctors: 142,
    departments: 18,
    establishedYear: "1980",
    rating: 4.8,
    type: "Private",
    status: "Active",
  },
  {
    id: 3,
    name: "Westside Clinic",
    address: "789 Wellness Road, Westside",
    phone: "+1 (555) 345-6789",
    email: "contact@westside.com",
    specialization: "Pediatrics",
    beds: 50,
    availableBeds: 0,
    doctors: 22,
    departments: 5,
    establishedYear: "2005",
    rating: 3.9,
    type: "Private",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Regional Medical Institute",
    address: "321 Healthcare Blvd, Northside",
    phone: "+1 (555) 456-7890",
    email: "info@regionalmedi.com",
    specialization: "Neurology",
    beds: 150,
    availableBeds: 30,
    doctors: 67,
    departments: 9,
    establishedYear: "1992",
    rating: 4.3,
    type: "Government",
    status: "Active",
  },
  {
    id: 5,
    name: "Sunrise Hospital",
    address: "654 Dawn Lane, Eastside",
    phone: "+1 (555) 567-8901",
    email: "sunrise@hospital.com",
    specialization: "Orthopedics",
    beds: 180,
    availableBeds: 55,
    doctors: 74,
    departments: 10,
    establishedYear: "2000",
    rating: 4.6,
    type: "Private",
    status: "Active",
  },
  {
    id: 6,
    name: "Metro Eye & ENT Center",
    address: "12 Vision Park, Central District",
    phone: "+1 (555) 678-9012",
    email: "metro@eyeent.com",
    specialization: "Ophthalmology",
    beds: 80,
    availableBeds: 20,
    doctors: 35,
    departments: 4,
    establishedYear: "2010",
    rating: 4.2,
    type: "Private",
    status: "Active",
  },
  {
    id: 7,
    name: "Green Valley Cancer Institute",
    address: "98 Oncology Drive, South City",
    phone: "+1 (555) 789-0123",
    email: "info@greenvalley.com",
    specialization: "Oncology",
    beds: 220,
    availableBeds: 40,
    doctors: 98,
    departments: 7,
    establishedYear: "1998",
    rating: 4.7,
    type: "Trust",
    status: "Active",
  },
  {
    id: 8,
    name: "Harbour Women & Child Hospital",
    address: "77 Maternity Lane, Harbour Bay",
    phone: "+1 (555) 890-1234",
    email: "hwch@harbour.com",
    specialization: "Gynecology",
    beds: 130,
    availableBeds: 15,
    doctors: 52,
    departments: 6,
    establishedYear: "2003",
    rating: 4.4,
    type: "Private",
    status: "Maintenance",
  },
]);

const search = ref("");
const statusFilter = ref("All");
const deleteDialog = ref(false);
const selectedHospital = ref<any>(null);

const specializationColors: Record<string, string> = {
  General: "blue",
  Cardiology: "red",
  Pediatrics: "green",
  Neurology: "purple",
  Orthopedics: "orange",
  Ophthalmology: "teal",
  Oncology: "deep-purple",
  Gynecology: "pink",
};

const typeColors: Record<string, string> = {
  Government: "blue",
  Private: "indigo",
  Trust: "teal",
};

const statusConfig: Record<string, { color: string; icon: any }> = {
  Active: { color: "success", icon: CheckIcon },
  Inactive: { color: "error", icon: XIcon },
  Maintenance: { color: "warning", icon: ToolIcon },
};

const filteredHospitals = computed(() => {
  return hospitals.value.filter((h) => {
    const matchSearch =
      !search.value ||
      h.name.toLowerCase().includes(search.value.toLowerCase()) ||
      h.address.toLowerCase().includes(search.value.toLowerCase()) ||
      h.specialization.toLowerCase().includes(search.value.toLowerCase());
    const matchStatus =
      statusFilter.value === "All" || h.status === statusFilter.value;
    return matchSearch && matchStatus;
  });
});

function confirmDelete(hospital: any) {
  selectedHospital.value = hospital;
  deleteDialog.value = true;
}

function deleteHospital() {
  hospitals.value = hospitals.value.filter(
    (h) => h.id !== selectedHospital.value?.id,
  );
  deleteDialog.value = false;
  selectedHospital.value = null;
}

function getRatingColor(rating: number) {
  if (rating >= 4.5) return "success";
  if (rating >= 4.0) return "warning";
  return "error";
}

function getOccupancyPercent(hospital: any) {
  return Math.round(
    ((hospital.beds - hospital.availableBeds) / hospital.beds) * 100,
  );
}
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Hospital List">
      
       

        <!-- Filters -->
        <v-row class="mb-4" align="center">
          <v-col cols="12" md="5">
            <v-text-field
              v-model="search"
              label="Search by name, address, specialization..."
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
          <v-col cols="12" md="3">
            <v-select
              v-model="statusFilter"
              :items="['All', 'Active', 'Inactive', 'Maintenance']"
              label="Filter by Status"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
        <v-col cols="12" md="3">
             <v-btn
            color="primary"
            to="/hospitals/add"
            elevation="0"
          >
            <template #prepend>
              <PlusIcon size="20" />
            </template>
            Add Hospital
          </v-btn>
        </v-col>

        </v-row>

        <!-- Table -->
        <v-card variant="outlined" rounded="lg">
          <v-table hover>
            <thead>
              <tr class="bg-grey-lighten-4">
                <th class="text-left font-weight-bold">#</th>
                <th class="text-left font-weight-bold">Hospital</th>

                <th class="text-left font-weight-bold">Staff</th>

                <th class="text-left font-weight-bold">Contact</th>
                <th class="text-left font-weight-bold">Status</th>
                <th class="text-center font-weight-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="hospital in filteredHospitals"
                :key="hospital.id"
                class="hover-row"
              >
                <!-- # -->
                <td class="text-body-2 text-medium-emphasis">
                  {{ hospital.id }}
                </td>

                <!-- Hospital Name + Address -->
                <td class="py-3">
                  <div class="d-flex align-center">
                    <v-avatar
                      color="primary"
                      size="42"
                      class="mr-3"
                      rounded="lg"
                    >
                      <BuildingHospitalIcon size="22" color="white" />
                    </v-avatar>
                    <div>
                      <div class="font-weight-semibold text-body-1">
                        {{ hospital.name }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Staff -->
                <td>
                  <div class="text-body-2">
                    <UserIcon
                      size="14"
                      color="rgb(var(--v-theme-primary))"
                      class="mr-1"
                    />
                    {{ hospital.doctors }} Doctors
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    <ClipboardListIcon size="12" class="mr-1" />
                    {{ hospital.departments }} Departments
                  </div>
                </td>

                <!-- Contact -->
                <td style="min-width: 160px">
                  <div class="text-body-2">
                    <PhoneIcon
                      size="13"
                      class="mr-1"
                    />
                    {{ hospital.phone }}
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    <MailIcon size="13" class="mr-1" />
                    {{ hospital.email }}
                  </div>
                </td>

                <!-- Status -->
                <td>
                  <v-chip
                    :color="statusConfig[hospital.status]?.color ?? 'grey'"
                    size="small"
                    variant="flat"
                  >
                    <component
                      :is="statusConfig[hospital.status]?.icon ?? CircleIcon"
                      size="12"
                      class="mr-1"
                    />
                    {{ hospital.status }}
                  </v-chip>
                </td>

                <!-- Actions -->
                <td class="text-center">
                  <v-btn
                    variant="text"
                    color="info"
                    size="small"
                    :to="`/hospitals/view?id=${hospital.id}`"
                  >
                    <EyeIcon size="20" />
                  </v-btn>

                  <v-btn
                    variant="text"
                    color="primary"
                    size="small"
                    :to="`/hospitals/edit?id=${hospital.id}`"
                  >
                    <PencilIcon size="20" />
                  </v-btn>

                  <v-btn
                    variant="text"
                    color="error"
                    size="small"
                    @click="confirmDelete(hospital)"
                  >
                    <TrashIcon size="20" />
                  </v-btn>
                </td>
              </tr>

              <!-- Empty state -->
              <tr v-if="filteredHospitals.length === 0">
                <td colspan="9" class="text-center py-8">
                  <CircleOffIcon
                    size="48"
                    color="rgb(var(--v-theme-grey-lighten-2))"
                    class="d-block mx-auto mb-2"
                  />
                  <div class="text-body-1 text-medium-emphasis">
                    No hospitals found
                  </div>
                  <div class="text-caption text-disabled">
                    Try adjusting your search or filter
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>

        <div class="d-flex justify-space-between align-center mt-4">
          <span class="text-body-2 text-medium-emphasis">
            Showing {{ filteredHospitals.length }} of
            {{ hospitals.length }} hospitals
          </span>
          <v-pagination :length="1" density="compact" />
        </div>
      </UiParentCard>
    </v-col>
  </v-row>

  <!-- Delete Confirmation Dialog -->
  <v-dialog v-model="deleteDialog" max-width="420" persistent>
    <v-card rounded="lg">
      <v-card-title class="d-flex align-center pa-4">
        <AlertCircleIcon color="rgb(var(--v-theme-error))" class="mr-2" />
        Confirm Delete
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-4">
        Are you sure you want to delete
        <strong>{{ selectedHospital?.name }}</strong
        >? This action cannot be undone.
      </v-card-text>
      <v-divider />
      <v-card-actions class="pa-3 justify-end">
        <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="error" variant="flat" @click="deleteHospital">
          <TrashIcon size="18" class="mr-1" />
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.hover-row:hover {
  background-color: rgba(var(--v-theme-primary), 0.04);
}
</style>
