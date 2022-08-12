import React from 'react'
import './App.css'
import Faucet from './containers/Faucet'
import TopBar from './containers/TopBar/TopBar'
import styled, { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import { useWallet, UseWalletProvider } from 'use-wallet'
import { chain } from './contract/common'
import theme from './theme'
import Container from './containers/Container'
import Token from './components/Token'

export const AppContext = React.createContext({})

const MyDivider = styled.div`
    display: hidden;
    height: 20px;
    width: 100%;
`

const StyledLinkContainer = styled.div`
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    text-align: center;
    margin: 14px auto 20px auto;
    color: #5c61da;
`

const StyleTitle = styled.div`
    margin-top: 141px;
    padding: 0 0;

    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    color: ${(props) => props.theme.color.whites[100]};
`

const StyledWrapper = styled.div`
    .background {
        background: ${(props) => props.theme.color.whites[100]};
        border: 1px solid ${(props) => props.theme.color.whites[200]};
        box-sizing: border-box;
        box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.08);
        border-radius: 16px;
        & + .background {
            margin-left: 20px;
        }
    }
`

const WalletProvider = () => {
    const wallet = useWallet()
    return (
        <StyledWrapper>
            <Router>
                <TopBar wallet={wallet} />
                <Container>
                    <StyleTitle>
                        Claim some test Token for using on Gliaswap!
                    </StyleTitle>
                    <Container
                        style={{
                            display: 'flex',
                            'flex-direction': 'row',
                            height: '91px',
                            'margin-top': '8px',
                        }}
                        size="md"
                    >
                        <Container size="sm" className="background">
                            <Token tokenName="CKB" logo="https://cryptologos.cc/logos/nervos-network-ckb-logo.svg?v=002" className="small CKB" />
                            <StyledLinkContainer>
                                <a
                                    href="https://faucet.nervos.org/"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    Claim at Nervos Aggron Faucet >>>
                                </a>
                            </StyledLinkContainer>
                        </Container>
                        <Container size="sm" className="background">
                            <Token tokenName="ETH" logo="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=002" className="small ETH" />
                            <StyledLinkContainer>
                                <a
                                    href="https://faucet.rinkeby.io//"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    Claim at Rinkeby Official Faucet >>>
                                </a>
                            </StyledLinkContainer>
                        </Container>
                    </Container>

                    <MyDivider />

                    <Container size="md">
                        <Faucet wallet={wallet} />
                    </Container>
                </Container>
            </Router>
        </StyledWrapper>
    )
}

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <UseWalletProvider
                chainId={chain.id}
                connectors={{ walletconnect: { rpcUrl: chain.rpcUrl } }}
            >
                <WalletProvider />
            </UseWalletProvider>
        </ThemeProvider>
    )
}

export default App
