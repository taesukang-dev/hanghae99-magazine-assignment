import _ from 'lodash'
import { useCallback, useEffect } from 'react'

const InfinityScroll = (props) => {
  const { callNext, is_next } = props

  const _hanelScroll = _.throttle(() => {
    const { innerHeight } = window
    const { scrollHeight } = document.body
    if (scrollHeight - innerHeight - document.documentElement.scrollTop < 250) {
      callNext()
    }
  })

  const handleScroll = useCallback(_hanelScroll, [_hanelScroll])

  useEffect(() => {
    if (is_next) {
      window.addEventListener('scroll', handleScroll)
    } else {
      window.removeEventListener('scroll', handleScroll)
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll, is_next])

  return <>{props.children}</>
}

InfinityScroll.dafaultProps = {
  callNext: () => {},
}

export default InfinityScroll
