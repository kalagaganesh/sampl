import styled from 'styled-components'

export const EachSelectContainer = styled.button`
  background: transparent;
  border-style: none;
  display: flex;
  font-size: 20px;
  color: #1e293b;
  cursor: pointer;
  text-decoration: none;
`
export const DisplayText = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 2px;
  font-family: 'Roboto';
  color: ${props => props.color};
`
export const SelectOneItemContainer = styled.ul`
  margin-left: -30px;
`
export const SelectContainer = styled.div`
  width: 250px;
  height: 700px;
  margin-left: px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => props.bgColor};
`
export const LogoContainer = styled.div`
  display: flex;
`
export const Logo = styled.img`
  width: 30px;
  margin-right: 10px;
`
export const ContactContainer = styled.div`
  margin-left: 20px;
`
export const ContactText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #1e293b;
  font-family: 'Roboto';
  color: ${props => props.color};
`
export const HomeMainContainer = styled.div`
  display: flex;
  width: 100%;
`

export const GamingHeader = styled.div`
  background-color: #e2e8f0;
  height: 90px;
  display: flex;
  padding-left: 40px;
  padding-top: 10px;
  width: 100%;
`
export const GamingLogo = styled.div`
  background-color: #000000;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  font-size: 30px;
  color: #ff0000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`
export const GamingText = styled.h1`
  font-family: 'Roboto';
  color: #424242;
  font-size: 20px;
  margin-left: 10px;
  margin-top: 16px;
`
export const TrendingMainContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
  background-color: ${props => props.bgColor};
`

export const TrendingVideoContainer = styled.ul`
  background-color: #f9f9f9;
  height: 100%;
  width: 100%;
  padding: 20px;
  margin-top: 0px;
  list-style-type: none;
`
export const EachTrendingVideoContainer = styled.li`
  display: flex;
  margin-bottom: 50px;
  margin-left: 20px;
`
export const TrendingThumbnailImage = styled.img`
  width: 300px;
  margin-right: 20px;
`
export const TrendingDetailsContainer = styled.div`
  margin-top: -10px;
`
export const TrendingName = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #383838;
  font-family: 'Roboto';
`

export const TrendingTitle = styled.h1`
  font-size: 16px;
  font-weight: bold;
  color: #1e293b;
  font-family: 'Roboto';
`

export const TrendingCountContainer = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #383838;
  font-family: 'Roboto';
`
export const TrendingSpanEle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #383838;
  font-family: 'Roboto';
  margin-left: 10px;
`
export const FailureImage = styled.img`
  width: 400px;
`
export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`
export const FailureHeading = styled.h1`
  color: #1e293b;
  font-family: 'Roboto';
  font-size: 30px;
`

export const FailurePara = styled.p`
  color: #606060;
  font-family: 'Roboto';
  font-size: 18px;
`

export const FailureBtn = styled.button`
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 15px;
  background-color: #4f46e5;
  border-style: none;
  font-weight: 500;
  width: 100px;
  height: 35px;
  border-radius: 3px;
  cursor: pointer;
`
export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const NotFoundImage = styled.img`
  width: 500px;
`
export const NotFoundHeading = styled.h1`
  color: ${props => props.color};
  font-family: 'Roboto';
  font-size: 30px;
`
export const NotFoundPara = styled.p`
  color: #475569;
  font-family: 'Roboto';
  font-size: 20px;
`
