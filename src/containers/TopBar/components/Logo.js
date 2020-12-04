import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Logo = () => {
  return (
    <StyledLogo to="/">
      <StyledText>
        GLIASWAP <FaucetText>Faucet</FaucetText>
      </StyledText>
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

const StyledText = styled.span`
    color: ${(props) => props.theme.color.whites[100]};
    font-family: Lato;
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

  letter-spacing: 0.03em;
  margin-left: ${(props) => props.theme.spacing[2]}px;
  @media (max-width: 400px) {
    display: none;
  }
`

const FaucetText = styled.span`
    color: ${(props) => props.theme.color.whites[100]};
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
`

export default Logo
