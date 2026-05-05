type OfficeVisualProps = {
  className?: string;
};

export function OfficeVisual({ className = "" }: OfficeVisualProps) {
  return (
    <div className={`officeVisual ${className}`} aria-hidden="true">
      <span className="officeBackWall" />
      <span className="officeFloor" />
      <span className="officeLight officeLightOne" />
      <span className="officeLight officeLightTwo" />
      <span className="officeRoom" />
      <span className="officeRoomShine" />
      <span className="officeCounter" />
      <span className="officeSofa officeSofaLeft" />
      <span className="officeSofa officeSofaRight" />
      <span className="officeTable" />
      <span className="officeTableLeg" />
      <span className="officePlantTrunk" />
      <span className="officePlantLeaf officePlantLeafOne" />
      <span className="officePlantLeaf officePlantLeafTwo" />
      <span className="officePlantPot" />
      <span className="officeSign" />
      <span className="officeHighlight" />
    </div>
  );
}
