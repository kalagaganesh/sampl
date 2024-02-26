import styled from 'styled-components'

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  padding-left: 30px;
  padding-right: 40px;
  height: 70px;
  background-color: ${props => props.bgColor};
`

export const WatchLogoImage = styled.img`
  width: 100px;
  height: 25px;
`
export const LightThemeButton = styled.button`
  border-style: none;
  background-color: transparent;
  font-size: 25px;
  cursor: pointer;
`
export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin-top: -1px;
`
export const LogoutButton = styled.button`
  color: ${props => props.color};
  border-style: none;
  background-color: transparent;
  font-family: 'Roboto';
  border: 1px solid ${props => props.bgColor};
  width: 70px;
  height: 25px;
  border-radius: 3px;
  cursor: pointer;
`
export const NavbarInnerContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-around;
`
export const WatchLogoButton = styled.button`
  height: 40px;
  background-color: transparent;
  border-style: none;
  cursor: pointer;
`
export const PopupContainer = styled.div`
  background-color: #424242;
  width: 320px;
  height: 150px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const PopupHeading = styled.p`
  font-family: 'Roboto';
  font-size: 18px;
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 30px;
`

export const PopupCloseBtn = styled.button`
  font-family: 'Roboto';
  border-style: none;
  background-color: transparent;
  color: #ffffff;
  width: 70px;
  height: 30px;
  border: 1px solid #ffffff;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 50px;
  font-weight: 500;
`

export const PopupLogoutBtn = styled.button`
  font-family: 'Roboto';
  border-style: none;
  background-color: #3b82f6;
  color: #ffffff;
  width: 70px;
  height: 30px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 500;
`
