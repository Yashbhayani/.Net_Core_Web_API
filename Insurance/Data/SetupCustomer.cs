using System.ComponentModel.DataAnnotations;

namespace Insurance.Data
{
    public class SetupCustomer
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public int InsuranceType { get; set; }

        public int Insurance_Amount { get; set; }

        public DateTime Insurance_Purchase_Date { get; set; }

    }
}
