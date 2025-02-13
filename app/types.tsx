export type RootStackParamList = {
  Home: undefined;
  JobDetails: {
    id: string;
    title: string;
    place: string;
    salary: string;
    phone: string;
    whatsapp_link: string;
    company: string;
  };
};

export type Job = {
  id: number;
  title: string;
  primary_details: {
    Place: string;
    Salary: string;
    Job_Type: string;
    Experience: string;
    Fees_Charged: string;
    Qualification: string;
  };
  company_name: string;
  whatsapp_no: string;
  contact_preference: {
    whatsapp_link: string;
  };
};
