import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SectionTitle from 'js/components/common/SectionTitle'
import SectionSubtitle from 'js/components/common/SectionSubtitle'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Dropdown, Input } from 'semantic-ui-react'
import { isMobile } from 'react-device-detect'
import { addGuildFeed } from 'js/actions/feeds'
import guildSelectors from 'js/selectors/guilds'
import AlertBox from 'js/components/common/AlertBox'

const AddFeedInputs = styled.div`
  > div {
    margin-bottom: 1em;
  }
  > div:last-child {
    margin-top: 1.5em;
    margin-bottom: 0;
    display: flex;
    justify-content: flex-end;
  }
`

function AddFeed (props) {
  const guild = useSelector(guildSelectors.activeGuild)

  const [url, setURL] = useState('')
  const [title, setTitle] = useState('')
  const [channel, setChannel] = useState('')
  const dispatch = useDispatch()
  const { channelDropdownOptions, limit } = props

  const add = async () => {
    const data = {
      url,
      channel
    }
    if (title) {
      data.title = title
    }
    await dispatch(addGuildFeed(guild.id, data))
    setURL('')
    setTitle('')
    setChannel('')
  }

  return (
    <div className="test" style={{
      width: '100%'
    }}>
      <SectionTitle
        heading='Add'
        subheading={
          limit !== 0
            ? (
              <>
                {/* Add a new feed. You may have a maximum of {limit} feeds. Need more? <a href='https://www.patreon.com/monitorss' target='_blank' rel='noopener noreferrer'>Help support MonitoRSS by becoming a supporter!</a> */}
                <AlertBox warn>
                  <span style={{ fontSize: '16px' }}>
        Feeds can no longer be added on this control panel. Please visit the newer control panel at <a href="https://my.monitorss.xyz" target="_blank" rel="noopener noreferrer">https://my.monitorss.xyz</a> instead.
                  </span>
                </AlertBox>
              </>
            )
            : ''
        }
      />
      <AddFeedInputs>
        <div>
          <SectionSubtitle>URL</SectionSubtitle>
          <Input disabled fluid onChange={e => setURL(e.target.value)} value={url} placeholder='Feed URL' onKeyPress={e => e.key === 'Enter' ? add() : null} />
        </div>
        <div>
          <SectionSubtitle>Channel</SectionSubtitle>
          <Dropdown selection fluid options={channelDropdownOptions} search={!isMobile} disabled onChange={(e, data) => setChannel(data.value)} value={channel} placeholder='Select a channel' onKeyPress={e => e.key === 'Enter' ? add() : null} />
        </div>
        <div>
          <SectionSubtitle>Title (Optional)</SectionSubtitle>
          <Input disabled fluid onChange={e => setTitle(e.target.value)} value={title} placeholder='This will be automatically resolved if left blank' onKeyPress={e => e.key === 'Enter' ? add() : null} />
        </div>
        <div>
          <Button content='Add' color='green' disabled onClick={add} />
        </div>
      </AddFeedInputs>
    </div>
  )
}

AddFeed.propTypes = {
  channelDropdownOptions: PropTypes.array,
  limit: PropTypes.number
}

export default AddFeed
