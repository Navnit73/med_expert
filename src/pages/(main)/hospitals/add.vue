<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const page = ref({ title: 'Add Hospital' });
const breadcrumbs = shallowRef([
  { title: 'Hospital', disabled: false, href: '/hospitals/list' },
  { title: 'Add Hospital', disabled: true, href: '#' }
]);

const form = ref({
  name: '',
  address: '',
  phone: '',
  email: '',
  specialization: '',
  beds: null,
  establishedYear: ''
});

const specializations = ['General', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Dermatology', 'Psychiatry'];
const loading = ref(false);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />
  <v-row>
    <v-col cols="12"  >
      <UiParentCard title="Add New Hospital">
      

        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Hospital Name *</v-label>
              <v-text-field
                v-model="form.name"
                placeholder="Enter hospital name"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Email Address *</v-label>
              <v-text-field
                v-model="form.email"
                placeholder="hospital@example.com"
                type="email"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Phone Number *</v-label>
              <v-text-field
                v-model="form.phone"
                placeholder="+1 (555) 000-0000"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-label class="text-body-2 font-weight-medium mb-2">Established Year</v-label>
              <v-text-field
                v-model="form.establishedYear"
                placeholder="2020"
                variant="outlined"
                density="comfortable"
                hide-details
              />
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
              <v-label class="text-body-2 font-weight-medium mb-2">Number of Beds</v-label>
              <v-text-field
                v-model="form.beds"
                placeholder="100"
                type="number"
                variant="outlined"
                density="comfortable"
                hide-details
              />
            </v-col>
            <v-col cols="12">
              <v-label class="text-body-2 font-weight-medium mb-2">Address *</v-label>
              <v-textarea
                v-model="form.address"
                placeholder="Enter complete address"
                variant="outlined"
                density="comfortable"
                rows="3"
                hide-details
              />
            </v-col>
          </v-row>

          <v-divider class="my-4" />

          <div class="d-flex float-right mb-2">
            <v-btn
              color="primary"
              prepend-icon="mdi-content-save"
              :loading="loading"
            >
              Save Hospital
            </v-btn>
            <v-btn
            class="ml-2"
              variant="outlined"
              prepend-icon="mdi-arrow-left"
              to="/hospitals/list"
            >
              Back to List
            </v-btn>
          </div>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>