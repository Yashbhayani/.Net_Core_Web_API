using Insurance.Data;
using Insurance.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Linq;
using System.Net;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Insurance.Controllers
{
/*    [EnableCors("AllowOrigin")]*/    
    
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {

        [Route("/GetCustomerInsuranceData")]
        [HttpGet]
        public IActionResult CustomerInsuranceTypeData()
        {
            try
            {
                using (var db = new InsuranceContext())
                {
                    var query = from customer in db.CustomerForms
                                join insurance in db.Insurances
                                on customer.InsuranceType equals insurance.Id
                                select new CustomerInsuranceData()
                                {
                                    Id = customer.Id,
                                    FirstName = customer.FirstName,
                                    LastName = customer.LastName,
                                    Email = customer.Email,
                                    Phone = customer.Phone,
                                    InsuranceType = insurance.InsuranceType,
                                    Insurance_Amount = customer.InsuranceAmount,
                                    Insurance_Purchase_Date = customer.InsurancePurchaseDate,
                                };

                    var result = query.ToList();
                    return Ok(result);
                }
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }

        [Route("/AddCustomerInsuranceData")]
        [HttpPost]
        public async Task<IActionResult> AddCustomerInsuranceTypeData([FromBody] SetupCustomer model)
        {
            try
            {
                using (var db = new InsuranceContext())
                {
                    if (
                        (model.FirstName != null && model.FirstName != "") &&
                        (model.LastName != null && model.LastName != "") &&
                        (model.Email != null && model.Email != "") &&
                        (model.Phone != null && model.Phone != "") &&
                        (model.InsuranceType != null && model.InsuranceType != 0) &&
                        (model.Insurance_Amount != null && model.Insurance_Amount != 0) &&
                        model.Insurance_Purchase_Date != null)
                    {
                        if (db.CustomerForms.Where(x => x.Email == model.Email).Count() > 0)
                        {
                            return Ok(value: "Email Id Number is Alrewady Added!");
                        }
                        
                        if (db.CustomerForms.Where(x => x.Phone == model.Phone).Count() > 0)
                        {
                            return Ok(value: "Phone Number is Alrewady Added!");
                        }
                        CustomerForm setupCustomer = new CustomerForm();
                        setupCustomer.FirstName = model.FirstName;
                        setupCustomer.LastName = model.LastName;
                        setupCustomer.Email = model.Email;
                        setupCustomer.Phone = model.Phone;
                        setupCustomer.InsuranceType = model.InsuranceType;
                        setupCustomer.InsuranceAmount = model.Insurance_Amount;
                        setupCustomer.InsurancePurchaseDate = model.Insurance_Purchase_Date;

                        db.CustomerForms.Add(setupCustomer);
                        await db.SaveChangesAsync();
                        return Ok("Save Data");
                    }
                    else
                    {
                        return Ok("Data is Missing");
                    }


                }
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }

        [Route("/UpdateCustomerInsuranceData")]
        [HttpPut]
        public async Task<IActionResult> UpdateCustomerInsuranceTypeData([FromBody] SetupCustomer model)
        {
        try
            {
                using (var db = new InsuranceContext())
                {
                    var User = db.CustomerForms.FirstOrDefault(x => x.Id == model.Id);

                    if(User != null)
                    {
                        if (
                            (model.FirstName != null && model.FirstName != "") &&
                            (model.LastName != null && model.LastName != "") &&
                            (model.Email != null && model.Email != "") &&
                            (model.Phone != null && model.Phone != "") &&
                            (model.InsuranceType != null && model.InsuranceType != 0) &&
                            (model.Insurance_Amount != null && model.Insurance_Amount != 0) &&
                            model.Insurance_Purchase_Date != null)
                        {
                            if (db.CustomerForms.Where(x => x.Email == model.Email).Count() > 0)
                            {
                                if(User.Email != model.Email)
                                {
                                    StatusCodeMessage statusCodeMessage = new StatusCodeMessage
                                    {
                                        Success = false,
                                        Message = "Email Id is Alrewady Added!",
                                    };
                                    return Ok(value: statusCodeMessage);
                                }
                            }

                            if (db.CustomerForms.Where(x => x.Phone == model.Phone).Count() > 0)
                            {
                                if(User.Phone != model.Phone)
                                {
                                    StatusCodeMessage statusCodeMessage = new StatusCodeMessage
                                    {
                                        Success = false,
                                        Message = "Phone Number is Alrewady Added!"
                                    };
                                    return Ok(value: statusCodeMessage);
                                }
                            }

                            User.FirstName = model.FirstName;
                            User.LastName = model.LastName;
                            User.Email = model.Email;
                            User.Phone = model.Phone;
                            User.InsuranceType = model.InsuranceType;
                            User.InsuranceAmount = model.Insurance_Amount;
                            User.InsurancePurchaseDate = model.Insurance_Purchase_Date;
                            await db.SaveChangesAsync();
                            StatusCodeMessage statusCodeMessageTrue = new StatusCodeMessage
                            {
                                Success = false,
                                Message = "Data Updated!"
                            };
                            return Ok(value: statusCodeMessageTrue);

                        }
                        else
                        {
                            StatusCodeMessage statusCodeMessageFalse = new StatusCodeMessage
                            {
                                Success = false,
                                Message = "Data is Missing!"
                            };
                            return Ok(value: statusCodeMessageFalse);
                        }
                    }
                    else
                    {
                        return Ok("Id is Not Valid");
                    }
                        
                }
             }
            catch (Exception e)
            {
                return Ok(e);
            }
        }

        [Route("/DeleteCustomerInsuranceData")]
        [HttpDelete]
        public IActionResult DeleteCustomerInsuranceTypeData(int id)
        {
            try
            {
                using (var db = new InsuranceContext())
                {
                    var User = db.CustomerForms.FirstOrDefault(x => x.Id == id);

                    if (User != null)
                    {
                        db.CustomerForms.Remove(User);
                        db.SaveChanges();
                        return Ok("Data Deleted");
                    }
                    else
                    {
                        return Ok("Id is Not Valid");
                    }

                }
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }

/*      [EnableCors("AllowOrigin")]*/
        [Route("/PatchMinMaxCustomerInsuranceData")]
        [HttpPatch]
        public IActionResult PatchMinMaxCustomerInsuranceTypeData([FromBody] MinMaxClass model)
        {
            try
            {
                using (var db = new InsuranceContext())
                {
                    if (model.InsuranceType == 0 && model.MinValue == 0 && model.MaxValue == 0 && model.InsurancePurchaseDate == "")
                    {
                        return Ok("Value is Null");
                    }
                    else
                    {
                        if (model.InsuranceType == 0 && model.MaxValue != 0 && model.InsuranceType != 0 && model.InsurancePurchaseDate == "")
                        {
                            var User = (from customerform in db.CustomerForms
                                        join insurance in db.Insurances
                                        on customerform.InsuranceType equals insurance.Id
                                        where customerform.InsuranceAmount >= model.MinValue && customerform.InsuranceAmount <= model.MaxValue
                                        /*orderby customerform.InsuranceAmount*/
                                        select new CustomerInsuranceData()
                                        {
                                            Id = customerform.Id,
                                            FirstName = customerform.FirstName,
                                            LastName = customerform.LastName,
                                            Email = customerform.Email,
                                            Phone = customerform.Phone,
                                            InsuranceType = insurance.InsuranceType,
                                            Insurance_Amount = customerform.InsuranceAmount,
                                            Insurance_Purchase_Date = customerform.InsurancePurchaseDate,
                                        }
                                       ).ToList();

                            if (User != null)
                            {
                                return Ok(User);
                            }
                            else
                            {
                                return Ok("Data Not Avalilabe!");
                            }
                        }
                        else
                        {
                            
                            if (model.InsuranceType != 0 && model.MinValue != 0 && model.MaxValue != 0 && model.InsurancePurchaseDate != "")
                            {
                                var User = (from customerform in db.CustomerForms
                                            join insurance in db.Insurances
                                            on customerform.InsuranceType equals insurance.Id
                                            where customerform.InsuranceAmount >= model.MinValue &&
                                            customerform.InsuranceAmount <= model.MaxValue &&
                                            customerform.InsuranceType == model.InsuranceType &&
                                            customerform.InsurancePurchaseDate == Convert.ToDateTime(model.InsurancePurchaseDate)
                                            select new CustomerInsuranceData()
                                            {
                                                Id = customerform.Id,
                                                FirstName = customerform.FirstName,
                                                LastName = customerform.LastName,
                                                Email = customerform.Email,
                                                Phone = customerform.Phone,
                                                InsuranceType = insurance.InsuranceType,
                                                Insurance_Amount = customerform.InsuranceAmount,
                                                Insurance_Purchase_Date = customerform.InsurancePurchaseDate,
                                            }
                                            ).ToList();

                                if (User != null)
                                {
                                    return Ok(User);
                                }
                                else
                                {
                                    return Ok("Data Not Avalilabe!");
                                }
                            }

                            if (model.InsuranceType == 0 && model.MinValue != 0 && model.MaxValue != 0 && model.InsurancePurchaseDate == "")
                            {
                                var User = (from customerform in db.CustomerForms
                                            join insurance in db.Insurances
                                            on customerform.InsuranceType equals insurance.Id
                                            where customerform.InsuranceAmount >= model.MinValue &&
                                            customerform.InsuranceAmount <= model.MaxValue                                            select new CustomerInsuranceData()
                                            {
                                                Id = customerform.Id,
                                                FirstName = customerform.FirstName,
                                                LastName = customerform.LastName,
                                                Email = customerform.Email,
                                                Phone = customerform.Phone,
                                                InsuranceType = insurance.InsuranceType,
                                                Insurance_Amount = customerform.InsuranceAmount,
                                                Insurance_Purchase_Date = customerform.InsurancePurchaseDate,
                                            }
                                            ).ToList();

                                if (User != null)
                                {
                                    return Ok(User);
                                }
                                else
                                {
                                    return Ok("Data Not Avalilabe!");
                                }
                            }

                            if (model.InsuranceType != 0 && model.MinValue != 0 && model.MaxValue != 0 && model.InsurancePurchaseDate == "")
                            {
                                var User = (from customerform in db.CustomerForms
                                            join insurance in db.Insurances
                                            on customerform.InsuranceType equals insurance.Id
                                            where customerform.InsuranceAmount >= model.MinValue &&
                                            customerform.InsuranceAmount <= model.MaxValue &&
                                            customerform.InsuranceType == model.InsuranceType
                                            select new CustomerInsuranceData()
                                            {
                                                Id = customerform.Id,
                                                FirstName = customerform.FirstName,
                                                LastName = customerform.LastName,
                                                Email = customerform.Email,
                                                Phone = customerform.Phone,
                                                InsuranceType = insurance.InsuranceType,
                                                Insurance_Amount = customerform.InsuranceAmount,
                                                Insurance_Purchase_Date = customerform.InsurancePurchaseDate,
                                            }
                                            ).ToList();

                                if (User != null)
                                {
                                    return Ok(User);
                                }
                                else
                                {
                                    return Ok("Data Not Avalilabe!");
                                }
                            }

                            if (model.InsuranceType == 0 && model.MinValue != 0 && model.MaxValue != 0 && model.InsurancePurchaseDate != "")
                            {
                                var User = (from customerform in db.CustomerForms
                                            join insurance in db.Insurances
                                            on customerform.InsuranceType equals insurance.Id
                                            where customerform.InsuranceAmount >= model.MinValue &&
                                            customerform.InsuranceAmount <= model.MaxValue &&
                                            customerform.InsurancePurchaseDate == Convert.ToDateTime(model.InsurancePurchaseDate)
                                            select new CustomerInsuranceData()
                                            {
                                                Id = customerform.Id,
                                                FirstName = customerform.FirstName,
                                                LastName = customerform.LastName,
                                                Email = customerform.Email,
                                                Phone = customerform.Phone,
                                                InsuranceType = insurance.InsuranceType,
                                                Insurance_Amount = customerform.InsuranceAmount,
                                                Insurance_Purchase_Date = customerform.InsurancePurchaseDate,
                                            }
                                            ).ToList();

                                if (User != null)
                                {
                                    return Ok(User);
                                }
                                else
                                {
                                    return Ok("Data Not Avalilabe!");
                                }
                            }

                            if(model.InsuranceType != 0 && model.MaxValue == 0 &&  model.MinValue == 0 && model.InsurancePurchaseDate == "")
                            {

                                var User = (from customerform in db.CustomerForms
                                            join insurance in db.Insurances
                                            on customerform.InsuranceType equals insurance.Id
                                            where customerform.InsuranceType == model.InsuranceType
                                            select new CustomerInsuranceData()
                                            {
                                                Id = customerform.Id,
                                                FirstName = customerform.FirstName,
                                                LastName = customerform.LastName,
                                                Email = customerform.Email,
                                                Phone = customerform.Phone,
                                                InsuranceType = insurance.InsuranceType,
                                                Insurance_Amount = customerform.InsuranceAmount,
                                                Insurance_Purchase_Date = customerform.InsurancePurchaseDate,
                                            }
                                            ).ToList();

                                if (User != null)
                                {
                                    return Ok(User);
                                }
                                else
                                {
                                    return Ok("Data Not Avalilabe!");
                                }
                            }

                            if (model.InsuranceType == 0 && model.MinValue == 0 && model.MaxValue == 0 && model.InsurancePurchaseDate != "")
                            {
                                var User = (from customerform in db.CustomerForms
                                            join insurance in db.Insurances
                                            on customerform.InsuranceType equals insurance.Id
                                            where customerform.InsurancePurchaseDate == Convert.ToDateTime(model.InsurancePurchaseDate)
                                            select new CustomerInsuranceData()
                                            {
                                                Id = customerform.Id,
                                                FirstName = customerform.FirstName,
                                                LastName = customerform.LastName,
                                                Email = customerform.Email,
                                                Phone = customerform.Phone,
                                                InsuranceType = insurance.InsuranceType,
                                                Insurance_Amount = customerform.InsuranceAmount,
                                                Insurance_Purchase_Date = customerform.InsurancePurchaseDate,
                                            }
                                            ).ToList();

                                if (User != null)
                                {
                                    return Ok(User);
                                }
                                else
                                {
                                    return Ok("Data Not Avalilabe!");
                                }
                            }

                            if (model.MinValue == 0 && model.MaxValue == 0 && model.InsuranceType != 0 && model.InsurancePurchaseDate != "")
                            {
                                var User = (from customerform in db.CustomerForms
                                               join insurance in db.Insurances
                                               on customerform.InsuranceType equals insurance.Id
                                               where customerform.InsuranceType == model.InsuranceType
                                               select new CustomerInsuranceData()
                                               {
                                                   Id = customerform.Id,
                                                   FirstName = customerform.FirstName,
                                                   LastName = customerform.LastName,
                                                   Email = customerform.Email,
                                                   Phone = customerform.Phone,
                                                   InsuranceType = insurance.InsuranceType,
                                                   Insurance_Amount = customerform.InsuranceAmount,
                                                   Insurance_Purchase_Date = customerform.InsurancePurchaseDate,
                                               }
                                            ).ToList();

                                if (User != null)
                                {
                                    return Ok(User);
                                }
                                else
                                {
                                    return Ok("Data Not Avalilabe!");
                                }

                            }

                            if (model.MinValue == 0 && model.MaxValue == 0 && model.InsuranceType != 0 && model.InsurancePurchaseDate != "")
                            {
                                var User = (from customerform in db.CustomerForms
                                            join insurance in db.Insurances
                                            on customerform.InsuranceType equals insurance.Id
                                            where customerform.InsuranceType == model.InsuranceType &&
                                            customerform.InsurancePurchaseDate == Convert.ToDateTime(model.InsurancePurchaseDate)
                                            select new CustomerInsuranceData()
                                            {
                                                Id = customerform.Id,
                                                FirstName = customerform.FirstName,
                                                LastName = customerform.LastName,
                                                Email = customerform.Email,
                                                Phone = customerform.Phone,
                                                InsuranceType = insurance.InsuranceType,
                                                Insurance_Amount = customerform.InsuranceAmount,
                                                Insurance_Purchase_Date = customerform.InsurancePurchaseDate,
                                            }
                                            ).ToList();

                                if (User != null)
                                {
                                    return Ok(User);
                                }
                                else
                                {
                                    return Ok("Data Not Avalilabe!");
                                }

                            }
                            else
                            {
                                return Ok();
                            }

                            
                        }

                    }

                }
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }
    }
    /*
    [EnableCors("AllowOrigin")]
        [Route("/PatchMinMaxCustomerInsuranceData")]
        [HttpGet]
        public IActionResult PatchMinMaxCustomerInsuranceTypeData(int MinClass, int MaxClass)
        {
            try
            {
                using (var db = new InsuranceContext())
                {
                    var User = (from customerform in db.CustomerForms
                                join insurance in db.Insurances
                                on customerform.InsuranceType equals insurance.Id
                                where customerform.InsuranceAmount >= MinClass && customerform.InsuranceAmount <= MaxClass
                                select new CustomerInsuranceData()
                               {
                                   Id = customerform.Id,
                                   FirstName = customerform.FirstName,
                                   LastName = customerform.LastName,
                                   Email = customerform.Email,
                                   Phone = customerform.Phone,
                                   InsuranceType = insurance.InsuranceType,
                                   Insurance_Amount = customerform.InsuranceAmount,
                                   Insurance_Purchase_Date = customerform.InsurancePurchaseDate,
                               }
                               ).ToList();

                    if (User != null)
                    {
                        return Ok(User);
                    }
                    else
                    {
                        return Ok("Data Not Avalilabe!");
                    }

                }
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }
     */

    /*
    [Route("/GetInsuranceData")]
    [HttpGet]
    public IActionResult InsuranceTypeData()
    {
        try
        {
            using (var db = new InsuranceContext())
            {
                var query = from customer in db.CustomerForms
                            join insurance in db.Insurances
                            on customer.InsuranceType equals insurance.Id
                            select new CustomerInsuranceData()
                            {
                                Id = customer.Id,
                                FirstName = customer.FirstName,
                                LastName = customer.LastName,
                                Email = customer.Email,
                                Phone = customer.Phone,
                                InsuranceType = insurance.InsuranceType,
                                Insurance_Amount = customer.InsuranceAmount,
                                Insurance_Purchase_Date = customer.InsurancePurchaseDate,
                            };

                var result = query.ToList();
                return Ok(result);
            }
        }
        catch (Exception e)
        {
            return Ok(e);
        }
    }
    */

    /*
        [Route("/GetInsuranceData")]
        [HttpGet]
        public IActionResult InsuranceTypeData()
        {
            try
            {
                using (var db = new InsuranceContext())
                {
                    var query = from customer in db.CustomerForms
                                join insurance in db.Insurances
                                on customer.InsuranceType equals insurance.Id
                                select new MainDataClass()
                                {
                                    setupCustomer = customer,
                                    Insurance = insurance
                                };

                    var result = query.ToList();
                    return Ok(result);
                }
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }
     */

    /*
       [Route("/GetInsuranceData")]
        [HttpGet]
        public IActionResult InsuranceTypeData()
        {
            try
            {
                using (var db = new InsuranceContext())
                {
                    var query = from customer in db.CustomerForms
                                join insurance in db.Insurances
                                on customer.InsuranceType equals insurance.Id
                                select new
                                {
                                    customer.Id,
                                    customer.FirstName,
                                    customer.LastName,
                                    customer.Email,
                                    customer.Phone,
                                    customer.InsurancePurchaseDate,
                                    customer.InsuranceAmount,
                                    insurance
                               };

                    var result = query.ToList();
                    return Ok(result);
                }
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }


     */
}
