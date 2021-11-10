import * as React from 'react'
import styled from 'styled-components'

import { TrackPlaylistDropzoneWrapper, TrackPlaylistNoDropWrapper } from './Track'
import { TracksOptions } from './TracksOptions'
import { TimeBar } from './TimeBar'
import { Flex } from '../Flex'
import { useTracks } from '../../state/tracks'
import { TrackController } from './TrackController'
import { TrackPlayList } from './TrackPlayList'

// REACT
// COMPONENTS
// ----------

// Controllers houses all of the track options (adding tracks)
// and the track controllers for each individual track.

const Controllers = (props) => {
  React.useEffect(() => {
    const controllersContainer = document.getElementById('TrackControllers')
    const playlistsContainer = document.getElementById('TrackPlaylists')

    const handler = (event) => {
      const playlistScrollY = controllersContainer.scrollTop
      playlistsContainer.scroll(playlistsContainer.scrollLeft, playlistScrollY)
    }

    controllersContainer.addEventListener('scroll', handler)
    return () => controllersContainer.removeEventListener('scroll', handler)
  }, [])

  return (
    <StyledControlSidebar id="TrackControllers" data-component="Controllers">
      <TracksOptions />
      {props.list.map((track, trackIndex) => (
        <TrackController
          {...track}
          key={track.trackName + trackIndex}
          trackIndex={trackIndex}
          isLastTrack={trackIndex === props.list.length - 1}
        />
      ))}
    </StyledControlSidebar>
  )
}

const Playlists = (props) => {
  React.useEffect(() => {
    const controllersContainer = document.getElementById('TrackControllers')
    const playlistsContainer = document.getElementById('TrackPlaylists')

    const handler = (event) => {
      const playlistScrollY = playlistsContainer.scrollTop
      controllersContainer.scroll(0, playlistScrollY)
    }

    playlistsContainer.addEventListener('scroll', handler)
    return () => playlistsContainer.removeEventListener('scroll', handler)
  }, [])

  return (
    <StyledPlaylistsContainer
      id="TrackPlaylists"
      trackCount={props.list.length}
      data-component="Playlists"
    >
      <TimeBar />
      {props.list.map((track, trackIndex) =>
        track.trackType === 'audio' ? (
          <TrackPlaylistDropzoneWrapper
            {...track}
            key={track.trackName + trackIndex}
            trackIndex={trackIndex}
          >
            <TrackPlayList {...track} trackIndex={trackIndex} />
          </TrackPlaylistDropzoneWrapper>
        ) : (
          <TrackPlaylistNoDropWrapper key={track.trackName + trackIndex}>
            <TrackPlayList
              key={track.trackName + trackIndex}
              {...track}
              trackIndex={trackIndex}
            />
          </TrackPlaylistNoDropWrapper>
        ),
      )}
    </StyledPlaylistsContainer>
  )
}

export const SongBuilder = (props) => {
  const { list, ...tracks } = useTracks()

  return (
    <StyledContainer data-component="SongBuilder">
      <StyledTrackList data-component="TrackList">
        <Playlists list={list} />
        <Controllers list={list} />
      </StyledTrackList>
    </StyledContainer>
  )
}

// STYLED
// COMPONENTS
// ----------

const StyledPlaylistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 56px);
  overflow-x: scroll;
  overflow-y: scroll;
  scroll-snap-type: proximity;
`

const StyledControlSidebar = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: visible;
  width: 240px;
  min-width: 240px;
  max-height: calc(100vh - 56px);
  padding-bottom: 17px;

  ::-webkit-scrollbar {
    display: none;
  }
`

const StyledTrackList = styled(Flex.Row)`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  max-width: 100%;
  height: fit-content;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  width: fit-content;

  background-image: linear-gradient(var(--grayscale4), var(--grayscale3));
`

const StyledContainer = styled(Flex.Column)`
  display: flex;
  flex-direction: column;
  background: var(--grayscale3);
  width: 100vw;
  height: 100%;
`
