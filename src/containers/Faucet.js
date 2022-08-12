import React, {useState, useContext, useEffect, useMemo} from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import CardContent from '../components/CardContent'
import CardTitle from '../components/CardTitle'
import {claimTestToken, getTokens} from '../APIs/index'
import 'antd/dist/antd.css'
import {Tooltip, Input, Button, Row, Select, Label} from 'antd'
import Token from '../components/Token'
import {ReactComponent as QuestionOutlined} from '../assets/svg/question.svg'
import {ReactComponent as IconAlertSuccess} from '../assets/svg/icon-alert-success.svg'
import {ReactComponent as IconAlertFail} from '../assets/svg/icon-alert-fail.svg'
import {ReactComponent as CopySVG} from '../assets/svg/copy.svg'

const {Option} = Select

const log = console.log.bind(console)

const clipboard = (content) => {
    const input = document.createElement('input')
    input.style.opacity = '0'
    document.body.appendChild(input)
    input.value = content
    input.select()
    input.setSelectionRange(0, 99999)
    document.execCommand('copy')
    document.body.removeChild(input)
}

const StyledTitle = styled.div``
const StyledDiv = styled.div`
  // margin-top: 40px;
  width: 100%;

  .font-bold {
    font-weight: bold !important;
  }

  .font-underscored {
    text-decoration: underline;
  }

  .amount {
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
  }

  .amount-label {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #666666;
    button {
      padding: 0;
      margin-left: 5px;
      position: relative;
      top: 1px;
      svg {
        width: 14px;
        height: 14px;
        path {
          fill: rgba(136, 136, 136, 1);
        }
      }
      &.question-btn {
        padding-top: 3px;
      }
    }
  }

  .ant-input-group {
    .ant-select {
      .ant-select-selector {
        width: 130px;
        height: 44px;
        background: #ffffff;
        border: 1px solid #e1e1e1 !important;
        box-sizing: border-box !important;
        border-radius: 4px !important;
      }
    }

    .text {
      font-size: 18px !important;
      line-height: 22px !important;
    }

    .ant-select-selection-item {
      display: flex !important;
    }
  }

  .div-address {
    display: flex !important;
    margin-top: 20px;
    width: 100% !important;
    height: 44px;

    .input-address {
      width: 450px;
      height: 44px;

      background: #f6f6f6;
      border: 1px solid #e1e1e1;
      box-sizing: border-box;
      border-radius: 16px;
    }

    Button:not([disabled]) {
      background: #5c61da;
    }

    Button {
      width: 160px;
      height: 44px;

      box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.08);
      border-radius: 16px;
      margin-left: 14px;

      font-family: Lato;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
      /* identical to box height */

      text-align: center;
      color: #ffffff;
    }
  }

  .div-hint-container {
    width: 100%;
    text-align: right;
  }

  .div-hint {
    display: inline-block;
    margin: 8px 0 0 0;

    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;

    color: #666666;
  }
`

const StyledLabel = styled.span`
  margin-left: 14px;
  height: 44px;

  div {
    line-height: 24px;
  }

  .ant-btn-icon-only {
    width: 14px;
    height: 14px;
    border: none;
    disabled: true;
    margin-left: 10px;
    top: 1px;
  }
`

export const TokenContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 14px;
  cursor: pointer;

  .left {
    align-items: flex-start;
  }

  .right {
    margin-left: auto;
    font-weight: bold;
    font-size: 16px;
    line-height: 17px;
    color: #666666;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const StyledAlertDiv = styled.div`
  width: 100%;
  background: #f6f6f6;
  border-radius: 4px;
  margin-top: 10px;

  & {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
  }

  .div-icon-alert {
    width: 24px;
    height: 24px;

    margin: 17px 10px;
    color: green;
    font-color: green;
  }

  .div-text {
    height: 100%;
    padding: 10px 0;

    // text
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;

    color: #000000;
  }
`

const validClaimArgs = ({tokenAddress, userAddress}) => {
    if (!tokenAddress || !userAddress) {
        return false
    }

    if (!tokenAddress.startsWith('0x') || !userAddress.startsWith('0x')) {
        return false
    }

    return true
}

const Faucet = ({wallet}) => {
    const [selectTokenName, setSelectTokenName] = useState('DAI')
    const [userAddress, setUserAddress] = useState('')
    const [claimed, setClaimed] = useState({})
    const [loading, setLoading] = useState(false)

    const copyToClipboard = 'Copy'
    const copied = 'Copied!'
    const [clipboardTooltip, setClipboardTooltip] = useState(copyToClipboard)

    const [alert, setAlert] = useState({
        status: 0, // 0 - no alert, 1: txHash receipt, 2: can't claim, 3: invalid address
        txHash: '0x1234',
        tokenName: 'DAI',
        userAddress: '0xuser',
    })

    const [tokens, setTokens] = useState([])
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (tokens.length === 0) {
                getTokens().then((res) => {
                    const allTokens = res.data
                    if (!allTokens || !allTokens.tokens) {
                        log(`getTokens error`, allTokens)
                    }
                    log(`getTokens: `, allTokens)
                    setTokens(allTokens.tokens)
                })
            }
        }, 1000)
        return () => clearTimeout(timeout)
    }, [tokens])

    const selectedTokenAddress = useMemo(() => {
        console.log('selectedTokenAddress')
        const selectedToken = tokens.find((token) => token.symbol === selectTokenName)
        if (selectedToken) {
            return selectedToken.address
        } else {
            return ''
        }
    }, [tokens, selectTokenName])

    const handleTokenSelect = (value) => {
        setSelectTokenName(value)
    }

    const handleAddressChange = (event) => {
        const self = event.target
        setUserAddress(self.value)
    }

    // when user click claim button
    const handleClaim = () => {
        log('claim button click!')
        const params = {
            tokenAddress: selectedTokenAddress,
            userAddress: userAddress,
        }

        if (!validClaimArgs(params)) {
            return setAlert({
                status: 3,
                userAddress: userAddress,
            })
        }

        log(`sent request for claimTestToken`)
        setLoading(true)
        claimTestToken(params).then((res) => {
            const resData = res.data
            if (!resData || !resData.txHash) {
                log(`request error`, resData)
            }
            log(`txHash: `, resData.txHash)
            setAlert({
                status: 1,
                txHash: resData.txHash,
                tokenName: selectTokenName,
                ...params,
            })
            setClaimed((prev) => {
                const obj = Object.assign({}, prev)
                obj[selectTokenName.toUpperCase()] = true
                return obj
            })
            setLoading(false)
        })
        return null
    }

    const renderAlert = () => {
        if (alert.status === 0) {
            return null
        } else if (alert.status === 1) {
            return (
                <StyledAlertDiv>
                    <IconAlertSuccess className="div-icon-alert"/>
                    <div className="div-text">
                        <div>
                            {`100 ${alert.tokenName.toUpperCase()} has been sent to `}
                            <span className="font-bold">
                                {alert.userAddress}
                            </span>
                        </div>
                        <div>
                            TX hash:{' '}
                            <a
                                className="font-underscored"
                                target="_blank"
                                rel="noreferrer noopener"
                                href={`https://rinkeby.etherscan.io/tx/${alert.txHash}`}
                            >
                                {alert.txHash}
                            </a>
                        </div>
                    </div>
                </StyledAlertDiv>
            )
        } else if (alert.status === 2) {
            const needWaitHours = 3
            const nextTimeString = `2020-11-28 09:49:38 +0000`
            return (
                <StyledAlertDiv>
                    <IconAlertFail className="div-icon-alert"/>
                    <div className="div-text">
                        <div>
                            Claim interval must be greater than{' '}
                            <span className="font-bold">{`${needWaitHours} hours`}</span>{' '}
                            for the same address.
                        </div>
                        <div>
                            The next valid time is{' '}
                            <span className="font-bold">{nextTimeString}</span>{' '}
                            .
                        </div>
                    </div>
                </StyledAlertDiv>
            )
        } else if (alert.status === 3) {
            return (
                <StyledAlertDiv>
                    <IconAlertFail className="div-icon-alert"/>
                    <div className="div-text">
                        <div>Invalid Address!!</div>
                        <div>
                            <span className="font-bold">
                                {alert.userAddress}
                            </span>
                        </div>
                    </div>
                </StyledAlertDiv>
            )
        }
    }

    return (
        <Card className="card-faucet background">
            <StyledTitle>
                <CardTitle text="ERC20"/>
            </StyledTitle>
            <CardContent>
                <StyledDiv>
                    <Input.Group compact>
                        <Select
                            className="tokenSelect"
                            defaultValue="DAI"
                            onChange={handleTokenSelect}
                        >
                            {
                                tokens.map((token) =>
                                    <Option key={token.symbol} value={token.symbol}>
                                        <Token tokenName={token.name} logo={token.logoURI} className="small"/>
                                    </Option>
                                )
                            }
                        </Select>

                        <StyledLabel>
                            <div className="amount">
                                Amount: 100
                                <span>
                                    <Tooltip title="You can claim 100 test tokens every day">
                                        <Button
                                            icon={
                                                <QuestionOutlined className="question-btn"/>
                                            }
                                        />
                                    </Tooltip>
                                </span>
                            </div>

                            <div className="amount-label">
                                <span>Contract Address: </span>
                                <span className="font-bold">
                                    {selectedTokenAddress}
                                    <Tooltip
                                        title={clipboardTooltip}
                                        placement="top"
                                        onVisibleChange={visible => visible && setClipboardTooltip(copyToClipboard)}
                                    >
                                    <Button
                                        type="text"
                                        onClick={() => {
                                            clipboard(selectedTokenAddress)
                                            setClipboardTooltip(copied)
                                        }}
                                    >
                                        <CopySVG className="full-width-and-height"/>
                                    </Button>
                                </Tooltip>
                                </span>
                            </div>
                        </StyledLabel>

                        <div className="div-address">
                            <Input
                                className="input-address"
                                placeholder="Enter receiving Ethereum address here"
                                onChange={handleAddressChange}
                            />
                            <Button
                                onClick={handleClaim}
                                loading={loading}
                                disabled={claimed[selectTokenName.toUpperCase()]}
                            >
                                {claimed[selectTokenName.toUpperCase()] ? `Claimed` : `Claim`}
                            </Button>
                        </div>

                        {
                            // alert txHash or error msg
                            renderAlert()
                        }

                        <div className="div-hint-container">
                            <Tooltip
                                placement="bottom"
                                title="If the token you claimed is not shown in your wallet automatically, try to find the “Add Token” button in your wallet and use the token’s contract address to add the token manually. "
                            >
                                <div className="div-hint">
                                    Can’t see the claimed token in your wallet?
                                </div>
                            </Tooltip>
                        </div>
                    </Input.Group>
                </StyledDiv>
            </CardContent>
        </Card>
    )
}

export default Faucet
