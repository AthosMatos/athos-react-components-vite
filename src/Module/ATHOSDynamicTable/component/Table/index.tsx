import ADTLoadingBar from "../components/ADTloadingBar";
import { usePropsContext } from "../contexts/propsContext";
import { ADTBody, ADTHeader, ADTTable } from "../styled";
import ADTCells from "./ADTCells";
import ADTColumns from "./ADTColumns";

const Table = () => {
    const {
        className,
        tableWrapperClassName,
        loading,
        data,
        noDataPlaceholder
    } = usePropsContext<any>();
    const celltextColor = undefined;
    const coltextColor = undefined;

    return (
        <div className={`p-1  ${tableWrapperClassName}`}>
            {loading ? (
                <ADTLoadingBar />
            ) : data.length === 0 && noDataPlaceholder ? (
                noDataPlaceholder
            ) : (
                <ADTTable className={`w-full ${className}`}>
                    <ADTHeader
                        className="text-zinc-500 dark:text-zinc-400 "
                        style={{
                            color: coltextColor
                        }}
                    >
                        <ADTColumns />
                    </ADTHeader>
                    <ADTBody
                        className="text-zinc-800 dark:text-zinc-100"
                        style={{
                            color: celltextColor
                        }}
                    >
                        <ADTCells />
                    </ADTBody>
                </ADTTable>
            )}
        </div>
    );
};

export default Table;
