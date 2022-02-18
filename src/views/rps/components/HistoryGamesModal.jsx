import React from 'react'
export default function HistoryGamesModal(props) {
    return (
        <>
            <h3 className="text-center mt-2">Recent Plays</h3>
            <div className="container">
                <div className="play-list">
                    <ul className="list-group">
                        {props.eventsmodal[11] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    <img width="35" height="35" className="rounded-circle" alt="" src={`${props.userdata11.pic1}`} />
                                    {props.userdata11.name1 !== '' ? props.userdata11.name1 : props.eventsmodal[11].returnValues[0].substring(0, 5)}
                                    {" played " + (props.eventsmodal[11].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: props.eventsmodal[11].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {props.eventsmodal[11].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[11].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {props.eventsmodal[11].returnValues[2] > 1 ? props.eventsmodal[11].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((props.blockchain - props.eventsmodal[11].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[11].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[11].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {props.eventsmodal[10] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    <img width="35" height="35" className="rounded-circle" alt="" src={`${props.userdata10.pic1}`} />
                                    {props.userdata10.name1 !== '' ? props.userdata10.name1 : props.eventsmodal[10].returnValues[0].substring(0, 5)}
                                    {" played " + (props.eventsmodal[10].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: props.eventsmodal[10].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {props.eventsmodal[10].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[10].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {props.eventsmodal[10].returnValues[2] > 1 ? props.eventsmodal[10].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((props.blockchain - props.eventsmodal[10].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[10].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[10].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {props.eventsmodal[9] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    <img width="35" height="35" className="rounded-circle" alt="" src={`${props.userdata9.pic1}`} />
                                    {props.userdata9.name1 !== '' ? props.userdata9.name1 : props.eventsmodal[9].returnValues[0].substring(0, 5)}
                                    {" played " + (props.eventsmodal[9].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: props.eventsmodal[9].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {props.eventsmodal[9].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[9].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {props.eventsmodal[9].returnValues[2] > 1 ? props.eventsmodal[9].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((props.blockchain - props.eventsmodal[9].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[9].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[9].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {props.eventsmodal[8] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    <img width="35" height="35" className="rounded-circle" alt="" src={`${props.userdata8.pic1}`} />
                                    {props.userdata8.name1 !== '' ? props.userdata8.name1 : props.eventsmodal[8].returnValues[0].substring(0, 5)}
                                    {" played " + (props.eventsmodal[8].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: props.eventsmodal[8].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {props.eventsmodal[8].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[8].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {props.eventsmodal[8].returnValues[2] > 1 ? props.eventsmodal[8].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((props.blockchain - props.eventsmodal[8].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[8].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[8].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {props.eventsmodal[7] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    <img width="35" height="35" className="rounded-circle" alt="" src={`${props.userdata7.pic1}`} />
                                    {props.userdata7.name1 !== '' ? props.userdata7.name1 : props.eventsmodal[7].returnValues[0].substring(0, 5)}
                                    {" played " + (props.eventsmodal[7].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: props.eventsmodal[7].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {props.eventsmodal[7].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[7].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {props.eventsmodal[7].returnValues[2] > 1 ? props.eventsmodal[7].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((props.blockchain - props.eventsmodal[7].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[7].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[7].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {props.eventsmodal[6] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    <img width="35" height="35" className="rounded-circle" alt="" src={`${props.userdata6.pic1}`} />
                                    {props.userdata6.name1 !== '' ? props.userdata6.name1 : props.eventsmodal[6].returnValues[0].substring(0, 5)}
                                    {" played " + (props.eventsmodal[6].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: props.eventsmodal[6].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {props.eventsmodal[6].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[6].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {props.eventsmodal[6].returnValues[2] > 1 ? props.eventsmodal[6].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((props.blockchain - props.eventsmodal[6].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[6].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[6].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {props.eventsmodal[5] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    <img width="35" height="35" className="rounded-circle" alt="" src={`${props.userdata5.pic1}`} />
                                    {props.userdata5.name1 !== '' ? props.userdata5.name1 : props.eventsmodal[5].returnValues[0].substring(0, 5)}
                                    {" played " + (props.eventsmodal[5].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: props.eventsmodal[5].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {props.eventsmodal[5].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[5].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {props.eventsmodal[5].returnValues[2] > 1 ? props.eventsmodal[5].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((props.blockchain - props.eventsmodal[5].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[5].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[5].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {props.eventsmodal[4] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    <img width="35" height="35" className="rounded-circle" alt="" src={`${props.userdata4.pic1}`} />
                                    {props.userdata4.name1 !== '' ? props.userdata4.name1 : props.eventsmodal[4].returnValues[0].substring(0, 5)}
                                    {" played " + (props.eventsmodal[4].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: props.eventsmodal[4].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {props.eventsmodal[4].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[4].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {props.eventsmodal[4].returnValues[2] > 1 ? props.eventsmodal[4].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((props.blockchain - props.eventsmodal[4].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[4].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[4].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {props.eventsmodal[3] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    <img width="35" height="35" className="rounded-circle" alt="" src={`${props.userdata3.pic1}`} />
                                    {props.userdata3.name1 !== '' ? props.userdata3.name1 : props.eventsmodal[3].returnValues[0].substring(0, 5)}
                                    {" played " + (props.eventsmodal[3].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: props.eventsmodal[3].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {props.eventsmodal[3].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[3].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {props.eventsmodal[3].returnValues[2] > 1 ? props.eventsmodal[3].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((props.blockchain - props.eventsmodal[3].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[3].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[3].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {props.eventsmodal[2] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    <img width="35" height="35" className="rounded-circle" alt="" src={`${props.userdata2.pic1}`} />
                                    {props.userdata2.name1 !== '' ? props.userdata2.name1 : props.eventsmodal[2].returnValues[0].substring(0, 5)}
                                    {" played " + (props.eventsmodal[2].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: props.eventsmodal[2].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {props.eventsmodal[2].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[2].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {props.eventsmodal[2].returnValues[2] > 1 ? props.eventsmodal[2].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((props.blockchain - props.eventsmodal[2].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[2].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[2].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {props.eventsmodal[1] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    <img width="35" height="35" className="rounded-circle" alt="" src={`${props.userdata1.pic1}`} />
                                    {props.userdata1.name1 !== '' ? props.userdata1.name1 : props.eventsmodal[1].returnValues[0].substring(0, 5)}
                                    {" played " + (props.eventsmodal[1].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: props.eventsmodal[1].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {props.eventsmodal[1].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[1].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                </div>
                                {props.eventsmodal[1].returnValues[2] > 1 ? props.eventsmodal[1].returnValues[2] + " times " : ""}
                                <small className="ms-auto mt-auto time-in-row">
                                    {((props.blockchain - props.eventsmodal[1].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[1].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[1].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {props.eventsmodal[0] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    <img width="35" height="35" className="rounded-circle" alt="" src={`${props.userdata0.pic1}`} />
                                    {props.userdata0.name1 !== '' ? props.userdata0.name1 : props.eventsmodal[0].returnValues[0].substring(0, 5)}
                                    {" played " + (props.eventsmodal[0].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: props.eventsmodal[0].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {props.eventsmodal[0].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[0].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {props.eventsmodal[0].returnValues[2] > 1 ? props.eventsmodal[0].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((props.blockchain - props.eventsmodal[0].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[0].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[0].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
