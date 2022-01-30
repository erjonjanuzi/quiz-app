import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Header, Segment, Table } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

interface Props {
    id: string,
    get: number
}

export default observer(function Leaderboard({ id, get }: Props) {
    const { quizStore, userStore } = useStore();

    useEffect(() => {
        userStore.getUser();
        if (id) quizStore.loadQuiz(id);
    }, [quizStore.saveResult, quizStore.selectedQuiz?.leaderboard])
    return (
        <>
            <Segment>
                <Table size="large" basic='very' celled  color="green">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Rank</Table.HeaderCell>
                            <Table.HeaderCell>Player</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {quizStore.selectedQuiz?.leaderboard.slice(0, get).map((element, index) => {
                            return <Table.Row key={element.user.id}>
                                <Table.Cell>
                                    {index + 1}
                                </Table.Cell>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Header.Content>
                                            {element.user.id === userStore.user.currentUser.id && '⭐️'}
                                            {element.user.firstName + ' ' + element.user.lastName}
                                            {element.user.id === userStore.user.currentUser.id && ' (You)'}
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>{element.score}</Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </Segment>

        </>
    )
})