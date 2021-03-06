import React, { PureComponent } from 'react';
import Processing from 'elements/processing';
import Recaptcha from 'react-recaptcha';


class Request extends PureComponent {
  render() {
    const { form, updateForm, submitRequest, error, processing, success } = this.props;
    return (
      <div className="col-md-8 offset-md-2">
        <div className="default__info">
          {processing ? <Processing />: null}
          <h5>Request new password</h5>
          <div className="settings__form-item">
            <label className="form-label">Your login</label>
            <input type="test" className="form form-full__width"
                   value={form.email} onChange={e => updateForm('email', e.target.value)}/>
          </div>
          <div className="settings__form-item">
            <Recaptcha
              sitekey="6Lf2mQ8UAAAAAHxT3TvPR2KMOYW2qS4g8j7qsLH8"
              render='explicit'
              elementID="login__recaptcha"
              onloadCallback={console.log.bind(this, "recaptcha loaded")}
              verifyCallback={hash => updateForm('google_recaptcha_response', hash)}
              expiredCallback={() => updateForm('google_recaptcha_response', '')}
              ref={e => this.recaptchaInstance = e}
            />
          </div>
          <div className="settings__form-item" style={{marginBottom: 0}}>
            <p className={error ? 'error': 'success'} style={{marginLeft: 0}}>
              {error || success}
            </p>
          </div>

          <div className="settings__form-item">
            <a className="button button-cover primary small"
               onClick={e => submitRequest(form)}>Restore</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Request;
