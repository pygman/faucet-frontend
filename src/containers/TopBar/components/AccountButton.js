import React from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import {GLIASWAP_URL} from "../../../constants/url";
const log = console.log.bind(console)

const AccountButton = () => {
  const handleConnectClick = () => {
    window.open(GLIASWAP_URL, '_blank');
  }

  return (
    <StyledAccountButton>
        <Button onClick={handleConnectClick} size="sm" text="Back to Gliaswap" />
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

export default AccountButton
