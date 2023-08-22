using System.ComponentModel.DataAnnotations;

namespace Insurance.Data
{
    public class Insurancee
    {
        public int Id { get; set; }
        public string InsuranceType { get; set; } = null!;
    }
}
