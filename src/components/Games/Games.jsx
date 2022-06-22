import { memo } from "react";
import { Table } from "reactstrap";
import { useAllGames } from '../../hooks/firebase/useAllGames';
import TableGames from './TableGames';

const Games = ({ isMobileResolution }) => {
    const allGames = useAllGames()
    return (
        <Table className="tbl-ranking" borderless responsive>
            <thead>
                <tr>
                    <th>Game</th>
                    <th>Player</th>
                    {!isMobileResolution &&
                        <>
                            <th>Amount</th>
                            <th>Result</th>
                            <th>Streak</th>
                        </>
                    }
                    <th>Profit</th>
                    {!isMobileResolution && <th>Time</th>}
                </tr>
            </thead>
            <tbody>
                {
                    allGames
                    &&
                    allGames.map((games) => (
                        <TableGames key={games.gameId} {...games} isMobileResolution={isMobileResolution} />
                    ))
                }
            </tbody>
        </Table >
    );
}

export default memo(Games);