import { DataTable } from 'components/shared'
import { Badge, Button, Dialog } from 'components/ui'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'

import { useDispatch, useSelector } from 'react-redux'
import { getOrderItems } from './store/dataSlice'
import { cloneDeep } from 'lodash'

injectReducer('expoOrderItems', reducer)

const ActionColumn = ({ row }) => {
    return <></>
}

export default function OrderDetails({ id }) {
    const tableRef = useRef(null)

    const [selectedRows, setSelectedRows] = useState([])

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.expoOrderItems.data.tableData
    )

    const loading = useSelector((state) => state.expoOrderItems.data.loading)

    const data = useSelector((state) => state.expoOrderItems.data.itemList)

    const columns = useMemo(
        () => [
            {
                header: 'Item',
                accessorKey: 'name',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const { done } = props.row.original
                    return (
                        <div className="flex items-center">
                            {done ? (
                                <Badge
                                    className="bg-green-500 text-green-50"
                                    content="Ready"
                                />
                            ) : (
                                <Badge
                                    className="bg-red-500 text-red-50"
                                    content="Not ready"
                                />
                            )}
                        </div>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const fetchData = useCallback(() => {
        dispatch(getOrderItems({ id }))
    }, [dispatch, id])

    useEffect(() => {
        if (id) fetchData()
    }, [dispatch, fetchData, id])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const onPaginationChange = (page) => {}

    const onSelectChange = (value) => {}

    const onSort = (sort) => {}

    const onRowSelect = (checked, row) => {
        if (checked) {
            setSelectedRows((prev) => [...prev, row])
        } else {
            setSelectedRows((prev) => prev.filter((elm) => elm.id !== row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked, rows) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds = []
                originalRows.forEach((row) => {
                    selectedIds.push(row)
                })
                setSelectedRows(selectedIds)
            } else {
                setSelectedRows([])
            }
        },
        [dispatch]
    )

    const handleClickReady = () => {
        const b = selectedRows.findIndex((row) => row.status == 'noready') != -1
        if (b) {
            setSelectedRows((prev) =>
                prev.map((elm) => ({ ...elm, status: 'ready' }))
            )
            /** API Call */
        }
        const f = selectedRows.findIndex((row) => row.status == 'ready') != -1
        if (f) {
            setSelectedRows((prev) =>
                prev.map((elm) => ({ ...elm, status: 'noready' }))
            )
            /** API Call */
        }
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row lg: items-center justify-end gap-4 my-2">
                {!(selectedRows.length === 0 || loading) && (
                    <Button
                        size="sm"
                        variant="solid"
                        onClick={handleClickReady}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                />
                            </svg>
                        }
                    >
                        {selectedRows.findIndex(
                            (row) => row.status == 'noready'
                        ) != -1
                            ? 'Ready'
                            : 'Unready'}
                    </Button>
                )}
                
            </div>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
                onCheckBoxChange={onRowSelect}
                onIndeterminateCheckBoxChange={onAllRowSelect}
                selectable
            />
           
        </>
    )
}
