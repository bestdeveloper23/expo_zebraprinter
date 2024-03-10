import { AdaptableCard } from 'components/shared'
import AlertTable from './components/AlertTable'
import AlertTools from './components/AlertTools'
import { injectReducer } from 'store'
import reducer from './store'

injectReducer('Alerts', reducer)

const AlertList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Alerts details</h3>
                <AlertTools />
            </div>
            <AlertTable />
        </AdaptableCard>
    )
}

export default AlertList