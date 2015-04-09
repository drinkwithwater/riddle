The mvc design frame and interface

    1. ModelManager:model
    2. ViewManager:view
    3. FrontendModule:controller

    model->view:
        animatePosMove
        animateBulletMove
    view->model:
        unit$
        maze$
    controller->model:
        onBattleEvent
    view->controller:
        viewActionHandler
        