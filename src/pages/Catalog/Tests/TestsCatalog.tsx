import { Catalog } from "../../../components/Catalog/";
import { getTests } from "../../../stores/Catalog/useTestsStore";

export default function TestsCatalog() {
    const items = getTests();
    return (
        <Catalog
            title="Tests"
            description="Explore our tests and earn points"
            redirectTo="test"
            items={items}
        />
    );
}
