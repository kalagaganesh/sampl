import styled from 'styled-components'

export const LoginBgContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const FormMainContainer = styled.form`
  box-shadow: 0px 4px 16px 0px #bfbfbf;
  width: 350px;
  height: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
`
export const WatchLogoImage = styled.img`
  width: 150px;
  margin-top: 30px;
  margin-bottom: 50px;
`
export const UsernameContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const LabelEle = styled.label`
  color: #94a3b8;
  font-size: 12px;
  font-weight: bold;
  font-family: 'Roboto';
  margin-bottom: 5px;
`
export const InputEle = styled.input`
  width: 280px;
  height: 35px;
  font-family: 'Roboto';
  padding-left: 5px;
  border-style: none;
  border: 2px solid #f1f5f9;
  color: #94a3b8;
  font-weight: 500;
  border-radius: 5px;
`
export const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`
export const InputCheckbox = styled.input`
  cursor: pointer;
`

export const LabelShowPassword = styled.label`
  color: #0f0f0f;
  font-family: 'Roboto';
`
export const LoginButton = styled.button`
  background-color: #3b82f6;
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: bold;
  width: 280px;
  height: 35px;
  border-style: none;
  border-radius: 5px;
  cursor: pointer;
`
export const CheckboxContainer = styled.div`
  align-self: flex-start;
  margin-left: 30px;
  margin-bottom: 25px;
  margin-top: 8px;
`
export const ErrorMsg = styled.p`
  color: #ff0000;
  font-family: 'Roboto';
  margin-top: 2px;
`
