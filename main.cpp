/* todo fo release:
 *  continue btn;
 *  new game with equal color;
 *  add music;
 *  come up main title;
 *  raiting; --fix empty name;
 *  testing android;
 *  testing ios;
 * */

#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QtQml>
#include "vibrator.h"

int main(int argc, char *argv[])
{
    QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
    Vibrator vibrator;
    qmlRegisterSingletonType(QUrl("qrc:/Settings.qml"), "xyz.prinkov", 1, 0, "Settings");
    qmlRegisterSingletonType(QUrl("qrc:/Workspace.qml"), "xyz.prinkov", 1, 0, "Workspace");

    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;
    engine.rootContext()->setContextProperty("Vibrator", &vibrator);
    engine.load(QUrl(QLatin1String("qrc:/main.qml")));

    return app.exec();
}
