using Insurance.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Insurance.Controllers
{
/*    [EnableCors("AllowOrigin")]
*/
    [Route("api/[controller]")]
    [ApiController]

    public class CustomerController : Controller
    {
        [Route("/Customer")]
        [HttpGet]
        public String Customer() => "Yash";

        [Route("/index")]

        [HttpGet]
        public IEnumerable<Customer> Index() => CustomerRepository.Customers;

        //id:int
        /*        [Route("CustomersInfoid/:id:min(1):max(100)")]*/
        [Route("CustomersInfoid")]
        [HttpGet]
        public Customer CustomersInfoid(int id) => CustomerRepository.Customers.FirstOrDefault(n => n.Id == id);

        [Route("CustomersInfofname/:id")]
        [HttpGet]
        public Customer CustomersInfofname(string id) => CustomerRepository.Customers.FirstOrDefault(n => n.FirstName == id);


        [Route("CustomersInfolname/:id")]
        [HttpGet]
        public Customer CustomersInfolname(string id) => CustomerRepository.Customers.FirstOrDefault(n => n.LastName == id);

        [Route("CustomersInfoemail/:id")]
        [HttpGet]
        public Customer CustomersInfoemail(string id) => CustomerRepository.Customers.FirstOrDefault(n => n.Email == id);

        [Route("CustomersInfophome/:id")]
        [HttpGet]
        public Customer CustomersInfophome(string id) => CustomerRepository.Customers.FirstOrDefault(n => n.Phone == id);

        [HttpGet("{id}", Name = "CustomersInfoitype")]
        public ActionResult<IEnumerable<Customer>> CustomersInfoitype(string id) => CustomerRepository.Customers.Where(n => n.InsuranceType == id).ToList();


        [HttpPost("create")]
        public ActionResult<Customer> creatCustomer([FromBody]Customer model)
        {
            if(model == null)
                return BadRequest();

            int NewId = CustomerRepository.Customers.LastOrDefault().Id + 1;
            Customer customer = new Customer {
                Id = NewId,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Phone = model.Phone,
                InsuranceType = model.InsuranceType,
                Insurance_Minimum_Amount = model.Insurance_Minimum_Amount,
                Insurance_Maximum_Amount = model.Insurance_Maximum_Amount,
                Insurance_Purchase_Date = model.Insurance_Purchase_Date
            };

            CustomerRepository.Customers.Add(customer);

            model.Id = customer.Id;
            return Ok(model);
        }

        [HttpDelete("Delete")]
        public ActionResult<Customer> deleteCustomer(int id)
        {
            if (id == null && id == 0)
                return BadRequest();

            var data = CustomerRepository.Customers.FirstOrDefault(n => n.Id == id);
            CustomerRepository.Customers.RemoveAt(id-1);

            var i = "Data Deleted " + id;
            return Ok(i);
        }


       
    }
}
