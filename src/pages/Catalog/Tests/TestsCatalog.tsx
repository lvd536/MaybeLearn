import Catalog from "../../../components/Catalog/Catalog";
import { getTests } from "../../../stores/useTestsStore";

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
