import React from 'react';
import style from './join.css';


function Join() {
  return (
    <>
      <section className="join">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>Join Free and Open Community</h2>
              <h3>Become A Sleek Freelance Pro !!</h3>
              <h4>
                Get curated remote/freelance jobs by email. Learn from industry
                veterens and experts.
                <br />
                Get personal help. No fillers and generic advice.
              </h4>
              <div id="revue-embed">
                <form
                  action="https://www.getrevue.co/profile/kapilgorve/add_subscriber"
                  method="post"
                  id="revue-form"
                  name="revue-form"
                  target="_blank"
                  className=""
                >
                  <div className="form-group input-group-lg">
                    <label htmlFor="Email" className="sr-only">
                      Email
                    </label>
                    <input
                      className="form-control"
                      placeholder="Your email address..."
                      type="email"
                      name="member[email]"
                      id="member_email"
                    />
                  </div>
                  <div className="form-group input-group-lg">
                    <input
                      type="submit"
                      value="Make Me Pro"
                      name="member[subscribe]"
                      id="member_submit"
                      className="form-control btn btn-lg btn-block btn-warning"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Join
