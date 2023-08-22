using Insurance.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Insurance.Controllers
{
/*    [EnableCors("AllowOrigin")]
*/    
    [Route("api/[controller]")]
    [ApiController]
    public class InsuranceController : Controller
    {

        public InsuranceContext _context = new InsuranceContext();


        [Route("/GetInsuranceData")]
        [HttpGet]
        public IActionResult GetInsuranceData()
        {
            /*            var result = _context.Insurances.Select(insurance => insurance.InsuranceType);
            */
            var result = _context.Insurances.ToList();
            return Ok(value: result);
        }

        [Route("/PostInsuranceData")]
        [HttpPost]
        public IActionResult PostInsuranceData([FromBody] Insurancee model)
        {
            if(model != null)
            {
                if (_context.Insurances.Where(x => x.InsuranceType == model.InsuranceType).Count() > 0)
                {
                    StatusCodeMessage statusCodeMessage = new StatusCodeMessage
                    {
                        Success = false,
                        Message = "Insurance Already Added!",
                    };
                    return Ok(value: statusCodeMessage);
                }
                else
                {
                    Insurance insurance = new Insurance();
                    insurance.InsuranceType = model.InsuranceType;
                    _context.Insurances.Add(insurance);
                    _context.SaveChanges();
                    StatusCodeMessage statusCodeMessage = new StatusCodeMessage
                    {
                        Success = true,
                        Message = "Data Added!",
                    };
                    return Ok(value: statusCodeMessage);
                }
            }
            else
            {
                StatusCodeMessage statusCodeMessage = new StatusCodeMessage
                {
                    Success = false,
                    Message = "Data is Not Added!",
                };
                return Ok(value: statusCodeMessage);
            }
        }

        [Route("/PutInsuranceData")]
        [HttpPut]
        public IActionResult PutInsuranceData([FromBody] Insurancee model)
        {
            if (model != null) {
                if (model.Id > 0)
                {
                    if (_context.Insurances.Where(x => x.InsuranceType == model.InsuranceType).Count() > 0)
                    {
                        var In = _context.Insurances.FirstOrDefault(X => X.Id == model.Id);

                        if (In.InsuranceType != model.InsuranceType)
                        {
                            StatusCodeMessage statusCodeMessage = new StatusCodeMessage
                            {
                                Success = false,
                                Message = "Insurance Already Added!",
                            };
                            return Ok(value: statusCodeMessage);
                        }
                    }
                   
                    var Data = _context.Insurances.FirstOrDefault(X => X.Id == model.Id);
                    if (Data != null)
                    {
                      /*  Data.InsuranceType = model.InsuranceType;
                        _context.SaveChanges();*/
                        StatusCodeMessage statusCodeMessage = new StatusCodeMessage
                        {
                            Success = true,
                            Message = "Data Updated!",
                        };
                        return Ok(value: statusCodeMessage);
                    }
                    else
                    {
                        StatusCodeMessage statusCodeMessage = new StatusCodeMessage
                        {
                            Success = false,
                            Message = "ID Is Not valid!",
                        };
                        return Ok(value: statusCodeMessage);
                    }
                }
                else
                {
                    StatusCodeMessage statusCodeMessage = new StatusCodeMessage
                    {
                        Success = false,
                        Message = "ID Is Not Mentioned!",
                    };
                    return Ok(value: statusCodeMessage);
                }
            } else
            {
                StatusCodeMessage statusCodeMessage = new StatusCodeMessage
                {
                    Success = false,
                    Message = "Data is Not Added!",
                };
                return Ok(value: statusCodeMessage);
            }
        }

        [Route("/DeleteInsuranceData")]
        [HttpDelete]
        public IActionResult DeleteInsuranceData(int id)
        {
            if (id > 0)
            {
                var Data = _context.Insurances.FirstOrDefault(X => X.Id == id);
                if (Data != null)
                {
                    _context.Insurances.Remove(Data);
                    _context.SaveChanges();
                    StatusCodeMessage statusCodeMessage = new StatusCodeMessage
                    {
                        Success = true,
                        Message = "Data Deleted!",
                    };
                    return Ok(value: statusCodeMessage);
                }
                else
                {
                    StatusCodeMessage statusCodeMessage = new StatusCodeMessage
                    {
                        Success = false,
                        Message = "ID Is Not valid!",
                    };
                    return Ok(value: statusCodeMessage);
                }
            }
            else
            {
                StatusCodeMessage statusCodeMessage = new StatusCodeMessage
                {
                    Success = false,
                    Message = "ID Is Not Mentioned!",
                };
                return Ok(value: statusCodeMessage);
            }

        }
    }
}
