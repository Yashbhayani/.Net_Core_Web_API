namespace Insurance.Models
{
    public class CustomerRepository
    {
        public static List<Customer> Customers { get; set; } = new List<Customer>(){
                new Customer
                {
                    Id = 1,
                    FirstName ="Yash",
                    LastName="Bhayani",
                    Email="yashpatel12@gmail.com",
                    Phone="9988776655",
                    InsuranceType="Car Insurance",
                    Insurance_Minimum_Amount=1000,
                    Insurance_Maximum_Amount=10000,
                    Insurance_Purchase_Date="30/08/2001"
                },
                new Customer
                {
                    Id = 2,
                    FirstName ="Hari",
                    LastName="Savaliya",
                    Email="hksavaliya@gmail.com",
                    Phone="9977553311",
                    InsuranceType="Car Insurance",
                    Insurance_Minimum_Amount=1000,
                    Insurance_Maximum_Amount=10000,
                    Insurance_Purchase_Date="30/08/2001"
                },
                new Customer
                {
                    Id = 3,
                    FirstName ="Akash",
                    LastName="Kuvadiya",
                    Email="akash12@gmail.com",
                    Phone="9988556677",
                    InsuranceType="Life Insurance",
                    Insurance_Minimum_Amount=1000,
                    Insurance_Maximum_Amount=10000,
                    Insurance_Purchase_Date="30/08/2001"
                }

            };
    }
}
