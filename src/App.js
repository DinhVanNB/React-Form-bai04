import './App.css';
import React, {useState,useEffect} from 'react';
import { Formik } from "formik";

export const App=() =>{
  const [form,setForm] = useState([]);
  const regex = {
      name: /^[a-zA-Z0-9 ]{2,}$/,
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      phone:/^[0-9.]{10,}$/,
      cmnd: /^[0-9]{12,12}$/,
      expYear: /^[0-9]{4,4}$/
  };

  useEffect(()=>console.log(form),[form])
  const onChange=(e)=>{
    setForm( ()=>{ 
      if(e.target.type ==="checkbox"){
        if(e.target.name==="theBHYT"){
          return { ...form,[e.target.name]: e.target.checked?e.target.value :'Không'
          }
        }
        else{
          let a;
          if(e.target.name==='trieuChung'){a = form.trieuChung||[]}
          else{
            a=form.tiepXuc||[];
          }
          return { ...form,[e.target.name]: e.target.checked? [].concat(a,e.target.value):a.filter(elemem => elemem!==e.target.value)||[]
         }
        }
      }
      else{
        return { ...form,[e.target.name]: e.target.value}
      }}
     )
  }
  function handleValidate(){
    const errors = {};
    if(!form.name){
       errors.name="Hãy nhập tên của bạn!!";
    }
    else if(!regex.name.test(form.name)){
      errors.name = "Tên không dấu và dài hơn 2 ký tự!!"
    }
    if (!form.email) {
      errors.email = "Hãy nhập email liên hệ!!";
    }
    else if(!regex.email.test(form.email)){
      errors.email = "Email không hợp lệ, định dạng chuẩn e@a.gi!!"
    }
    if (!form.phone) {
      errors.phone = "Bạn phải nhập tell liên hệ!!";
    }
    else if(!regex.phone.test(form.phone)){
      errors.phone = "Phone không hợp lệ, độ dài ít nhất 10 số!!"
    }
    if (!form.cmnd) {
      errors.cmnd = "Hãy điền số CMND!!";
    }
    else if(!regex.cmnd.test(form.cmnd)){
      errors.cmnd = "Độ dài số CMND không hợp lệ!!"
    }
    if (!form.expYear) {
      errors.expYear = "Hãy điền năm sinh!!";
    }
    else if(!regex.expYear.test(form.expYear) || +form.expYear<1900 ){
      errors.expYear = "Năm sinh phải lớn hơn 1900 độ dài 4!!"
    }
    if (!form.quocTich) {
      errors.quocTich = "Hãy điền quốc tịch!!";
    }
    if (!form.city) {
      errors.city = "Hãy điền tỉnh thành phố nơi sinh sống!!";
    }
    if (!form.quanHuyen) {
      errors.quanHuyen = "Hãy điền quận huyện nơi sinh sống!!";
    }
    if (!form.phuongXa) {
      errors.phuongXa = "Hãy điền phường xã nơi sinh sống!!";
    }
    if (!form.address) {
      errors.address = "Hãy điền số nhà/ tổ dân phố/ thôn/ xóm nơi sinh sống!!";
    }
    
    return errors;
      
  }
  function handleSubmit(){
      alert(`Thêm ${form.name} thành công`)
  }
  return(
  <div className='container'>
  <div className='title'>
    <h3 >Tờ khai y tế</h3>
  </div>
      <Formik 
      initialValues={form}
      validate={handleValidate}
      onSubmit={handleSubmit}
      >
      {({ errors , handleSubmit })=>(
        <form onSubmit={handleSubmit }>
        <div className= {`custom-input ${errors.name ? "custom-input-error" : ""}`}>
          <label>Name</label>
          <input name='name' type="text" value={form.name||''} onChange={onChange}/>
          <p className="error">{errors.name}</p>
        </div>
        
        <div className= {`custom-input ${errors.cmnd ? "custom-input-error" : ""}`}>
          <label>Số hộ chiếu / CMND</label>
          <input name='cmnd' type="text" value={form.cmnd||''} onChange={onChange}/>
          <p className="error">{errors.cmnd}</p>
        </div>

        <div className= {`custom-input ${errors.expYear ? "custom-input-error" : ""}`}>
          <label>Năm sinh</label>
          <input name="expYear" type="tel" value={form.expYear||''} onChange={onChange}/>
          <p className="error">{errors.expYear}</p>
        </div>
        <div className='hstack'>
            <label  className='w-50'>Giới tính</label>
            <label  >Nam </label>
            <input  className='w-25' onChange={onChange} value="Nam"  name='gender'  type="radio"/>
            <label  >Nữ </label>
            <input  className='w-25' onChange={onChange} value="Nữ"  name='gender'  type="radio"/>
        </div>
        
        <div className= {`custom-input ${errors.quocTich ? "custom-input-error" : ""}`}>
          <label>Quốc tịch</label>
          <input name="quocTich" type="text" value={form.quocTich||''} onChange={onChange}/>
          <p className="error">{errors.quocTich}</p>
        </div>

        <div className= 'custom-input' >
          <label>Công ty làm việc</label>
          <input name='company' type="text" value={form.company||''} onChange={onChange}/>
        </div>
        <div className= 'custom-input' >
          <label>Bộ phận làm việc</label>
          <input name='boPhan' type="text" value={form.boPhan||''} onChange={onChange}/>
        </div>
        <div className= 'custom-input hstack' >
          <label  >Có thẻ bảo hiểm y tế
          </label>
          <input className='w-25' name='theBHYT' value="Có" type="checkbox"   onChange={onChange}/>
        </div>
        <h5>Địa chỉ liên lạc tại Việt Nam</h5>
        <div className= {`custom-input ${errors.city ? "custom-input-error" : ""}`}>
          <label>Tỉnh thành</label>
          <input name="city" type="text" value={form.city||''} onChange={onChange}/>
          <p className="error">{errors.city}</p>
        </div>
        <div className= {`custom-input ${errors.quanHuyen ? "custom-input-error" : ""}`}>
          <label>Quận /huyện</label>
          <input name="quanHuyen" type="text" value={form.quanHuyen||''} onChange={onChange}/>
          <p className="error">{errors.quanHuyen}</p>
        </div>
        <div className= {`custom-input ${errors.phuongXa ? "custom-input-error" : ""}`}>
          <label>Phường /xã</label>
          <input name="phuongXa" type="text" value={form.phuongXa||''} onChange={onChange}/>
          <p className="error">{errors.phuongXa}</p>
        </div>
        <div className= {`custom-input ${errors.address ? "custom-input-error" : ""}`}>
          <label>Số nhà, phố, tổ dân phố /thôn /đội</label>
          <input name="address" type="text" value={form.address||''} onChange={onChange}/>
          <p className="error">{errors.address}</p>
        </div>
        <div className= {`custom-input ${errors.phone ? "custom-input-error" : ""}`}>
          <label>Điện thoại</label>
          <input name="phone" type="tel" value={form.phone||''} onChange={onChange}/>
          <p className="error">{errors.phone}</p>
        </div>
        <div className= {`custom-input ${errors.email ? "custom-input-error" : ""}`}>
          <label>Email</label>
          <input name='email' type="text" value={form.email||''} onChange={onChange}/>
          <p className="error">{errors.email}</p>
        </div>
        <div className="custom-input">
          <label className='h6' >Trong vòng 14 ngày qua, Anh/Chị có đến quốc gia/vùng lãnh thổ nào(Có thể đi đến nhiều quốc gia)</label>
          <textarea  name="mess" cols={42} rows={1} type="textarea" value={form.mess||''}     onChange={onChange}></textarea>
        </div>
        <div className= 'custom-input' >
          <label className='h6'  >Trong vòng 14 ngày qua, Anh/Chị có thấy xuất hiện dấu hiệu nào sau đây không? </label>
          <div className='hstack my-1'>
            <input className='navbar-toggler-icon'   name='trieuChung' value="Sốt" type="checkbox"   onChange={onChange}/>
            <label  className=' mx-2'  >Sốt</label>
          </div>
          <div className='hstack my-1'>
            <input className='navbar-toggler-icon'   name='trieuChung' value="Ho" type="checkbox"   onChange={onChange}/>
            <label className=' mx-2' >Ho</label>
          </div>
          <div className='hstack my-1'>
            <input className='navbar-toggler-icon'   name='trieuChung' value="Khó thở" type="checkbox"   onChange={onChange}/>
            <label className=' mx-2' >Khó thở</label>
          </div>
          <div className='hstack my-1'>
            <input className='navbar-toggler-icon'   name='trieuChung' value="Viêm phổi" type="checkbox"   onChange={onChange}/>
            <label className=' mx-2' >Viêm phổi</label>
          </div>
          <div className='hstack my-1'>
            <input className='navbar-toggler-icon'   name='trieuChung' value="Đau họng" type="checkbox"   onChange={onChange}/>
            <label className=' mx-2' >Đau họng</label>
          </div>
          <div className='hstack my-1'>
            <input className='navbar-toggler-icon'  name='trieuChung' value="Mệt mỏi" type="checkbox"   onChange={onChange}/>
            <label className=' mx-2' >Mệt mỏi</label>
          </div>
        </div>

        <div className= 'custom-input' >
          <label className='h6'  >Trong vòng 14 ngày qua, Anh/Chị có tiếp xúc với? </label>
          <div className='hstack my-1'>
            <input className='navbar-toggler-icon'  name='tiepXuc' value="Người mắc bệnh" type="checkbox"   onChange={onChange}/>
            <label   className=' mx-2'  >Người bệnh hoặc nghi ngờ, mắc bệnh COVID-19</label>
          </div>
          <div className='hstack my-1'>
            <input className='navbar-toggler-icon'   name='tiepXuc' value="Người từ nước ngoài" type="checkbox"   onChange={onChange}/>
            <label  className=' mx-2' >Người từ nước có bệnh COVID-19</label>
          </div>
          <div className='hstack my-1'>
            <input className='navbar-toggler-icon'  name='tiepXuc' value="Người có biểu hiện" type="checkbox"   onChange={onChange}/>
            <label className=' mx-2'  >Người có biểu hiện (Sốt, ho, khó thở, viêm phổi)</label>
          </div>
        
        </div>
        <button className='btn btn-success' type="submit">Submit</button>
        </form>
      )}
      </Formik>
  </div>
  );
}

