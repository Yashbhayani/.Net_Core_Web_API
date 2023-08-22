using System.ComponentModel.DataAnnotations;

namespace Insurance.Models
{
    public class Customer
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string InsuranceType { get; set; }

        [Required]
        public int Insurance_Minimum_Amount { get; set; }

        [Required]
        public int Insurance_Maximum_Amount { get; set; }

        [Required]
        public string Insurance_Purchase_Date { get; set; }
    }
}
