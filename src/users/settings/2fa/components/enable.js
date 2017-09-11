import React, { PureComponent } from 'react';


import Code from './code';
import Processing from 'elements/processing';


class TwoFaEnable extends PureComponent {

  render() {
    const { form, error, url, updateForm, getQrcodeUrl, processing, setEnable2fa} = this.props;

    return(
      <div className="col-md-8 offset-md-2">
        <div className="default__info">
          {processing ? <Processing />: null}
          <div className="row">
            <div className="col-md-6">
              <h5>Enable two-step verification</h5>
              <p>For more safety of your account, activate two-factor authentication (2FA).
                To do this you need the code with 6 characters.
                To get this code, download Google Authenticator and scan QR code.</p>
              <div className="settings__form-item">
                <label className="form-label">Enter the 6-digit code:</label>
                <input type="text" className="form" placeholder="code"
                       value={form.code} onChange={e => updateForm('code', e.target.value)}/>
              </div>
              <div className="settings__form-item">
                { !url ?
                  <a className="settings__form-item__button"
                     onClick={e => getQrcodeUrl()}>Qr Code</a> :
                  <a className="settings__form-item__button"
                     onClick={e => setEnable2fa(form, true)}>Enable</a>}
                  <p className="error">
                    {error}
                  </p>
              </div>
            </div>
            <div className="col-md-6">
              <h5 style={{textAlign: 'center'}}>Qr code</h5>
              {url ? <Code url={url}/> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default TwoFaEnable;
