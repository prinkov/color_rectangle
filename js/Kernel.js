var workspace
function init(workspace_) {
    workspace = workspace_
}

function createConv() {
    if(workspace.curLines == workspace.maxLines)
        return
    var convComponent = Qt.createComponent("qrc:/templates/Conveyor.qml");
        var conv = convComponent.createObject(workspace.scene.rowLines);
        conv.width =  workspace.scene.width / workspace.maxLines
        conv.height = workspace.scene.height
        if(workspace.curLines == 0)
            var t = createBlock(conv)
        workspace.curLines++
        return conv
}

function createBlock(conv) {
    var component = Qt.createComponent("qrc:/templates/Block.qml");
    var t = component.createObject(conv);
    t.oneAnim.target = t;
    t.oneAnim.property = "y";
    t.oneAnim.from = t.y;
    t.conveyorHeight = conv.height
    t.oneAnim.to = 0;
    t.oneAnim.duration = t.durationPre;
    t.twoAnim.target = t;
    t.twoAnim.property = "y";
    t.twoAnim.to =  conv.height;
    t.twoAnim.duration = t.durationPost
    t.oneAnim.start()
    t.oneAnim.stopped.connect(function() {
        if(workspace.mayCreate) {
            var g = createBlock(conv)
        } else if(!workspace.scene.timer.running){
            console.log("i'm started")
            workspace.scene.timer.start()
        }
        t.twoAnim.start()
    })
    t.twoAnim.stopped.connect(function() {
        if(t.col === workspace.color) {
            workspace.lifeDecrease()
        }
        t.destroy()
        workspace.boomIncrease()

    })

    t.onBoomed.connect(function() {
        t.destroy()
        workspace.boomIncrease()
    })

    return t;
}
