using System;
using System.Collections.Generic;

namespace Insurance
{
    public partial class CustomerForm
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public int InsuranceType { get; set; }
        public int InsuranceAmount { get; set; }
        public DateTime InsurancePurchaseDate { get; set; }
    }
}
