
const Toast = ({msg,handlShow,bgColor}) => {

  return (
    <div className={`toast show position-fixed text-light ${bgColor}`}
      style={{top:'5px', right:'5px', zIndex:9,minWidth:'280px'}}
      role="alert" data-autohide='false' aria-live="assertive" aria-atomic="true">
      <div className={`toast-header ${bgColor} text-light`}>
      {
        msg.title === 'Error' ? 

        <svg style={{height:'30px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 352c17.69 0 32-14.32 32-31.1V64.01c0-17.67-14.31-32.01-32-32.01S32 46.34 32 64.01v255.1C32 337.7 46.31 352 64 352zM64 400c-22.09 0-40 17.91-40 40s17.91 39.1 40 39.1s40-17.9 40-39.1S86.09 400 64 400z"/></svg>
        
        :
        <svg style={{height:'30px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
      }
       
        <strong className="mr-auto">{msg.title}</strong>
        <small>11 mins ago</small>
        <button type="button" className="ml-2 mb-1 close" 
          data-dismiss="toast" style={{outline:'none', background:'none'}} onClick={handlShow} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">
      {msg.msg}
      </div>
    </div>
  );
}

export default Toast;
