import { createBoard } from '@wixc3/react-board';
import { MyCompenent } from '../../components/navbar/navbar';

export default createBoard({
    name: 'MyBoard',
    Board: () => (
        <div>
            <MyCompenent text="this is the nested text of this component" />
        </div>
    ),
    environmentProps: {
        canvasWidth: 512,
        canvasHeight: 191,
        windowWidth: 1042,
        windowHeight: 601,
    },
});
