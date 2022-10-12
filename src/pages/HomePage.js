import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Banner from '../components/banner/Banner'
import ErrorFallback from '../components/ErrorBoundary'
const CoinsTable = React.lazy(() => import('../components/CoinsTable'))

const HomePage = () => {
  return (
    <>
      <Banner />

      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>{window.location.reload()}}>
        <Suspense fallback={<div>loading coins-table</div>}>
          <CoinsTable />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default HomePage
