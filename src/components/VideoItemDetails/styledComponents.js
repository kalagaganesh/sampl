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
export const HomeVideosMainContainer = styled.div`
  background-color: ${props => props.bgColor};
  height: 100%;
  padding: 20px;
  width: 100%;
  padding-bottom: 100px;
`
export const VideoContainer = styled.div`
  height: 650px;
`
export const Title = styled.p`
  color: #1e293b;
  font-family: 'Roboto';
  font-weight: 500;
  color: ${props => props.color};
`
export const ViewCountContainer = styled.div`
  display: flex;
  margin-top: -10px;
  font-family: 'Roboto';
  color: #475569;
  font-size: 15px;
  font-weight: 500;
`
export const ViewCount = styled.p`
  margin-right: 10px;
  display: flex;
  color: ${props => props.color};
`
export const LikeDislikeContainer = styled.div`
  display: flex;
`
export const EachLikeDislikeContainer = styled.button`
  display: flex;
  background-color: transparent;
  border-style: none;
  cursor: pointer;
  color: ${props => props.color};
`
export const EachText = styled.span`
  font-family: 'Roboto';
  font-size: 15px;
  margin-right: 5px;
  margin-left: 5px;
  margin-top: -2px;
  font-weight: 500;
  background-color: transparent;
  border-style: none;
`
export const ViewLikeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const SpanEle = styled.span`
  display: list-item;
  margin-left: 25px;
`
export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  margin-top: 12px;
`
export const DescriptionContainer = styled.div`
  display: flex;
`
export const NameEle = styled.div`
  font-family: 'Roboto';
  color: #1e293b;
  font-size: 15px;
  font-weight: 500;
  margin-top: 15px;
  color: ${props => props.color};
`
export const Subscribers = styled.div`
  font-family: 'Roboto';
  color: #383838;
  font-size: 15px;
  font-weight: 500;
  margin-top: 5px;
  color: ${props => props.color};
`
