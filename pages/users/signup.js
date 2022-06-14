import Head from 'next/head';
const signup = () => {
  return (
    <div>
      <Head>
       <title>Sign Up Page</title>
      </Head>
      <form className='mx-auto my-4' style={{maxWidth:'500px'}}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputPassword1">Confirm Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default signup;
