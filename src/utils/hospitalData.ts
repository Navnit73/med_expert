import { ref } from "vue";

export interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  specialization: string;
  beds: number;
  availableBeds: number;
  doctors: number;
  departments: number;
  establishedYear: string;
  rating: number;
  type: string;
  status: string;
}

export const hospitals = ref<Hospital[]>([
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

export function getHospitalById(id: number): Hospital | undefined {
  return hospitals.value.find((h) => h.id === id);
}
