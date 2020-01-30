import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import { useAsyncRetry } from 'react-use'

import { getReviews } from './review.service'
import ReviewsTable from './ReviewsTable'
import { Review } from './types'

export default function Reviews() {
  const [
    toggleHighlightStartingFromRow1,
    setToggleHighlightStartingFromRow1
  ] = useState(false)
  const [reviews, setReviews] = useState<Review[] | null>(null)

  const { loading, error, retry } = useAsyncRetry(async () => {
    const reviews = await getReviews()
    setReviews(reviews)
  }, [])

  return (
    <section>
      <Button onClick={retry} variant="contained">
        Refresh
      </Button>
      {loading && <> Loading...</>}
      <div>
        <Switch
          checked={toggleHighlightStartingFromRow1}
          onChange={() =>
            setToggleHighlightStartingFromRow1(!toggleHighlightStartingFromRow1)
          }
          color="default"
          value={toggleHighlightStartingFromRow1}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </div>
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        reviews && (
          <>
            <ReviewsTable
              reviews={reviews}
              toggleHighlightStartingFromRow1={toggleHighlightStartingFromRow1}
            />
          </>
        )
      )}
    </section>
  )
}
