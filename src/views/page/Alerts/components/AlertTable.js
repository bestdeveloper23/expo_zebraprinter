import React, { useEffect, useMemo, useRef } from 'react'
import { Avatar, Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getAlerts, setTableData } from '../store/dataSlice'
import cloneDeep from 'lodash/cloneDeep'

const alertType = {
    warning: {
        type: 'warning',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    info: {
        type: 'info',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    error: {
        type: 'error',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const MessageColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.message}</span>
        </div>
    )
}

const AlertTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total, type } = useSelector(
        (state) => state.Alerts.data.tableData
    )

    const filterData = useSelector((state) => state.Alerts.data.filterData)

    const loading = useSelector((state) => state.Alerts.data.loading)

    const data = useSelector((state) => state.Alerts.data.alertList)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort, type])

    useEffect(() => {
        if (tableRef) {
            tableRef.current.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getAlerts({ pageIndex, pageSize, sort, query, type }))
    }
    console.log(data)

    const columns = useMemo(
        () => [
            {
                header: 'Message',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <MessageColumn row={row} />
                },
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.read ? 'Read': "Unread"}</span>
                },
            },
            {
                header: 'Type',
                accessorKey: 'type',
                cell: (props) => {
                    const { type } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <Badge className={alertType[type].dotClass} />
                            <span
                                className={`capitalize font-semibold ${alertType[type].textClass}`}
                            >
                                {alertType[type].type}
                            </span>
                        </div>
                    )
                },
            },
        ],
        []
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort, sortingColumn) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
        </>
    )
}

export default AlertTable
